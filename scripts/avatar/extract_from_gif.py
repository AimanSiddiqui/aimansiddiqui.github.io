"""Turn one frame of the red-background avatar GIF into a transparent, upscaled PNG.

Usage:
    python scripts/avatar/extract_from_gif.py avatar.gif [--frame 0] [--weights RealESRGAN_x4plus.pth]

Writes scripts/avatar/avatar-source.png, the input for split_layers.py.

The GIF is only 480x270, so the frame is upscaled 4x. With --weights (Real-ESRGAN
x4plus, https://github.com/xinntao/Real-ESRGAN/releases, needs `torch` and
`spandrel`) the upscale is AI-based and sharp; without it, it falls back to
Lanczos, which is noticeably softer.
"""

import argparse
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

OUT = Path(__file__).resolve().parent / "avatar-source.png"
SCALE = 4
PADDING = 20


def upscale(img: Image.Image, weights: str | None) -> Image.Image:
    if not weights:
        return img.resize((img.width * SCALE, img.height * SCALE), Image.LANCZOS)
    import torch
    from spandrel import ModelLoader

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = ModelLoader().load_from_file(weights).eval().to(device)
    x = torch.from_numpy(np.asarray(img, np.float32) / 255).permute(2, 0, 1)[None].to(device)
    with torch.no_grad():
        y = model(x)[0].permute(1, 2, 0).clamp(0, 1).cpu().numpy()
    return Image.fromarray((y * 255).round().astype(np.uint8))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("gif")
    ap.add_argument("--frame", type=int, default=0)
    ap.add_argument("--weights")
    args = ap.parse_args()

    gif = Image.open(args.gif)
    gif.seek(args.frame)  # (a list of ImageSequence frames all alias the last one)
    img = upscale(gif.convert("RGB"), args.weights)
    rgb = np.asarray(img).astype(np.float32)

    # Background = strongly red regions connected to the image border. Red areas
    # inside the character (lips, cheeks) are enclosed, so they survive.
    redness = rgb[..., 0] - np.maximum(rgb[..., 1], rgb[..., 2])
    labels, _ = ndimage.label(redness > 70)
    border = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    background = np.isin(labels, border[border > 0])

    fg = ndimage.binary_opening(~background, iterations=2)
    labels, n = ndimage.label(fg)
    fg = labels == (int(np.argmax(ndimage.sum(fg, labels, range(1, n + 1)))) + 1)
    fg = ndimage.binary_fill_holes(fg)

    alpha = ndimage.gaussian_filter(ndimage.binary_erosion(fg).astype(np.float32), 1.0)

    # Remove the red fringe the background leaves on the silhouette
    near_edge = ndimage.distance_transform_edt(fg) < 8
    neutral = np.maximum(rgb[..., 1], rgb[..., 2])
    rgb[..., 0] = np.where(near_edge, np.minimum(rgb[..., 0], neutral + 35), rgb[..., 0])

    ys, xs = np.nonzero(fg)
    h, w = fg.shape
    x0, x1 = max(0, xs.min() - PADDING), min(w, xs.max() + 1 + PADDING)
    y0, y1 = max(0, ys.min() - PADDING), min(h, ys.max() + 1 + PADDING)
    out = np.dstack([rgb, alpha * 255])[y0:y1, x0:x1]
    Image.fromarray(out.clip(0, 255).astype(np.uint8), "RGBA").save(OUT)
    print(f"Wrote {OUT} ({x1 - x0}x{y1 - y0})")


if __name__ == "__main__":
    main()
