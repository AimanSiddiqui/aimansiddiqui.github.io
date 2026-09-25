"""Build the hero's peeking-panda clips from the raw AI renders.

usage: python scripts/avatar/build_peek_panda.py [--ffmpeg PATH]

Reads public/panda/raw/{peek_idle,peek_hi,rise,out-idle}.mp4 (1920x1080,
24 fps, flat blue background) and writes to public/panda/:

    peek-idle.webm  seamless peeking loop
    peek-hi.webm    wave hello, starts and ends on the peek pose
    rise.webm       peek pose -> up pose
    out-idle.webm   seamless smiling loop, starts and ends on the up pose
    sink.webm       up pose -> peek pose (the rise, reversed)
    pose-peek.webp, pose-up.webp   stills (poster / Safari / reduced motion)
    layout.json     where the blank paper is, for the name overlay

Clips are cut where the source frames genuinely match (pose distance about the
size of one normal frame step), so switching between them needs no blending,
which would show a ghosted double image. Frame ranges were chosen by measuring
pose distances; update SEGMENTS if the raw clips change.
"""

import argparse
import json
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / 'public' / 'panda' / 'raw'
OUT = ROOT / 'public' / 'panda'

BG = np.array([35, 94, 180], np.float32)  # the render's blue backdrop
KEY_LO, KEY_HI = 30.0, 75.0  # colour distance from BG: fully clear -> fully opaque
CROP = (196, 28, 1540, 928)  # x, y, w, h in source pixels (union of all poses)
OUT_W = 900
FPS = 24

# Still poses: A (peek) = peek_idle frame 6, B (up) = rise frame 23
A_REF = ('peek_idle', 6)
B_REF = ('rise', 23)

PINGPONG: set[str] = set()  # played forward then backward
REVERSED = {'sink'}

# name: (source clip, first frame, last frame, blend in from, blend out to, blend frames in/out)
SEGMENTS = {
    'peek-idle': ('peek_idle', 6, 211, None, None, (0, 0)),  # frame 212 ~= frame 6: loops as is
    'peek-hi': ('peek_hi', 9, 173, None, None, (0, 0)),  # starts/ends ~= peek_idle frame 6
    'rise': ('rise', 5, 23, None, None, (0, 0)),  # ends ~= out-idle frame 6
    'out-idle': ('out-idle', 6, 184, None, None, (0, 0)),  # frame 185 ~= frame 6: loops as is
    'sink': ('rise', 5, 23, None, None, (0, 0)),  # reversed: up -> peek
}


def read_frames(ffmpeg, clip, first, last, tmp):
    d = Path(tmp) / f'{clip}_{first}_{last}'
    if d.exists():
        return [np.asarray(Image.open(f).convert("RGB")).astype(np.float32) for f in sorted(d.glob("*.png"))]
    d.mkdir()
    x, y, w, h = CROP
    subprocess.run(
        [ffmpeg, '-hide_banner', '-loglevel', 'error', '-i', str(RAW / f'{clip}.mp4'),
         '-vf', f"select=between(n\\,{first}\\,{last}),crop={w}:{h}:{x}:{y}", '-vsync', '0', str(d / '%04d.png')],
        check=True,
    )
    return [np.asarray(Image.open(f).convert('RGB')).astype(np.float32) for f in sorted(d.glob('*.png'))]


def key(rgb):
    """Premultiplied RGBA with the blue backdrop removed (exact unmix at edges)."""
    dist = np.linalg.norm(rgb - BG, axis=-1)
    a = np.clip((dist - KEY_LO) / (KEY_HI - KEY_LO), 0, 1)[..., None]
    # Edge pixels are a mix of subject and blue: subtract the blue share
    fg = np.clip(rgb - (1 - a) * BG, 0, 255)
    return np.concatenate([fg, a * 255], axis=-1)  # premultiplied colour


# The AI renders re-draw the sign slightly differently over time, which shows as
# a shimmer when clips switch. Every frame therefore uses one fixed sign plate,
# taking pixels from the video only where the panda clearly differs from it.
PANDA_DIFF = 40  # per-pixel difference (0-255) that counts as "the panda moved here"


def paper_top(plate):
    rgb = plate[..., :3]
    cream = (rgb[..., 0] > 200) & (rgb[..., 1] > 185) & (rgb[..., 2] > 150) & (rgb[..., 2] < 240)
    return int(np.nonzero(cream.sum(1) > cream.shape[1] * 0.5)[0].min())


def green(img):
    a = img[..., 3] / 255
    rgb = img[..., :3] / np.maximum(a, 0.01)[..., None]
    return (a > 0.3) & (rgb[..., 1] > rgb[..., 0] + 15) & (rgb[..., 1] > rgb[..., 2])


def pole_top(plate):
    g = green(plate)
    return int(np.nonzero(g.sum(1) > g.shape[1] * 0.6)[0].min())


def stabilize(frame, plate, top, pole):
    # From the pole down: fixed plate, except where she clearly differs (paws)
    moved = np.abs(frame - plate).max(axis=-1) > PANDA_DIFF
    moved = ndimage.binary_opening(moved, iterations=1)  # drop texture speckle
    moved = ndimage.binary_dilation(moved, iterations=4)
    # Above the pole only she and the bamboo leaves exist: take her from the
    # video, keep the leaves fixed
    leaves = ndimage.binary_dilation(green(frame) | green(plate), iterations=2)
    moved[:pole] = ~leaves[:pole] | moved[:pole]
    moved[top + 6:] = False  # nothing of hers ever shows on the paper
    m = ndimage.gaussian_filter(moved.astype(np.float32), 1.5)[..., None]
    return plate * (1 - m) + frame * m


def mix(p, q, t):
    return p * (1 - t) + q * t


def save(frame, path, size):
    rgb, a = frame[..., :3], frame[..., 3:] / 255
    straight = np.where(a > 0.004, rgb / np.maximum(a, 0.004), 0)
    img = Image.fromarray(np.dstack([np.clip(straight, 0, 255), a[..., 0] * 255]).astype(np.uint8), 'RGBA')
    img.resize(size, Image.LANCZOS).save(path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--ffmpeg', default='ffmpeg')
    ap.add_argument('clips', nargs='*', help='only rebuild these (default: all)')
    args = ap.parse_args()
    ffmpeg = args.ffmpeg

    size = (OUT_W, round(CROP[3] * OUT_W / CROP[2] / 2) * 2)
    with tempfile.TemporaryDirectory() as tmp:
        plate = key(read_frames(ffmpeg, A_REF[0], A_REF[1], A_REF[1], tmp)[0])
        top = paper_top(plate)
        pole = pole_top(plate)
        refs = {
            'A': plate,
            'B': stabilize(key(read_frames(ffmpeg, B_REF[0], B_REF[1], B_REF[1], tmp)[0]), plate, top, pole),
        }
        for name, (clip, first, last, start, end, (k_in, k_out)) in SEGMENTS.items():
            if args.clips and name not in args.clips:
                continue
            frames = [stabilize(key(f), plate, top, pole) for f in read_frames(ffmpeg, clip, first, last, tmp)]
            if name in PINGPONG:
                frames = frames + frames[-2:0:-1]
            if name in REVERSED:
                frames = frames[::-1]
            n = len(frames)
            if start:
                for i in range(k_in):
                    frames[i] = mix(refs[start], frames[i], i / k_in)
            if end:
                for i in range(k_out):
                    frames[n - 1 - i] = mix(refs[end], frames[n - 1 - i], i / k_out)
            seq = Path(tmp) / f'out_{name}'
            seq.mkdir()
            for i, f in enumerate(frames):
                save(f, seq / f'{i:04d}.png', size)
            subprocess.run(
                [ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-framerate', str(FPS), '-i', str(seq / '%04d.png'),
                 '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '34', '-row-mt', '1',
                 '-deadline', 'good', '-an', str(OUT / f'{name}.webm')],
                check=True,
            )
            print(f'{name}: {n} frames, {(OUT / f"{name}.webm").stat().st_size // 1024} KB')

        for pose, ref in (('peek', 'A'), ('up', 'B')):
            p = Path(tmp) / f'{pose}.png'
            save(refs[ref], p, size)
            Image.open(p).save(OUT / f'pose-{pose}.webp', quality=90, method=6)

        # Blank paper area in pose A (cream pixels below the pole), for the name overlay
        a = refs['A']
        rgb = a[..., :3]
        cream = (rgb[..., 0] > 200) & (rgb[..., 1] > 185) & (rgb[..., 2] > 150) & (rgb[..., 2] < 240)
        rows = np.nonzero(cream.sum(1) > cream.shape[1] * 0.5)[0]
        cols = np.nonzero(cream[rows].sum(0) > len(rows) * 0.8)[0]
        h, w = cream.shape
        layout = {
            'aspect': [size[0], size[1]],
            'paper': {
                'left': round(cols.min() / w * 100, 2),
                'right': round(cols.max() / w * 100, 2),
                'top': round(rows.min() / h * 100, 2),
                'bottom': round(rows.max() / h * 100, 2),
            },
        }
        (OUT / 'layout.json').write_text(json.dumps(layout, indent=2))
        print('layout', layout)


if __name__ == '__main__':
    main()
