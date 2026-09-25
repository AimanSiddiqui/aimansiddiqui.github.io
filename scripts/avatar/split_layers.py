"""Split the flattened avatar PNG into animation layers for <PandaAvatar />.

Usage:
    python scripts/avatar/split_layers.py scripts/avatar/avatar-source.png [--preview out_dir]

The source comes from extract_from_gif.py.

Writes to public/avatar/:
    body.png        base character with the irises painted out and the ears removed
    eye-mask.png    white where the eye opening is (used as a CSS mask)
    left-iris.png   iris + pupil + highlight, full-canvas, occluded parts rebuilt
    right-iris.png
    closed-eyes.png both eyes closed (skin filled in, lash line), used for blinking
    left-ear.png    cap ears, full-canvas, sit behind the body layer
    right-ear.png

Every layer has the same canvas size as the source, so they stack with no
offsets. If you swap the artwork, update the EYES and EARS values below
(pixel coordinates in the source image) and rerun.
"""

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

# Viewer's left/right, in source pixels:
#   center/radius  the iris circle (measure the dark limbal ring edge to edge)
#   lids           y of the upper and lower eyelid edge straight through the iris center
#   box            search area around the eye
EYES = {
    "left": {"center": (386.0, 337.5), "radius": 23.0, "lids": (316.5, 365.5), "box": (340, 305, 440, 375)},
    "right": {"center": (531.5, 340.0), "radius": 23.0, "lids": (319.0, 365.0), "box": (485, 305, 590, 378)},
}

# Rough search box around each ear (x0, y0, x1, y1).
EARS = {
    "left": (215, 5, 400, 165),
    "right": (515, 0, 705, 165),
}

OUT_DIR = Path(__file__).resolve().parents[2] / "public" / "avatar"


def luminance(rgb: np.ndarray) -> np.ndarray:
    return rgb[..., 0] * 0.299 + rgb[..., 1] * 0.587 + rgb[..., 2] * 0.114


def disk(shape, center, radius):
    yy, xx = np.mgrid[0 : shape[0], 0 : shape[1]]
    return np.hypot(xx - center[0], yy - center[1])


def is_sclera(rgb, lum):
    # Sclera is neutral/cool even in shadow; skin is much warmer (low blue/red).
    return (rgb[..., 2] / np.maximum(rgb[..., 0], 1) > 0.62) & (lum > 70)


def refine_iris(rgb, eye):
    """Fit the iris circle to where the sclera meets the dark iris.

    `center`/`radius` in EYES only need to be a rough guess; this returns the fit.
    """
    x0, y0, x1, y1 = eye["box"]
    lum = luminance(rgb)
    sclera = is_sclera(rgb, lum)
    cx, cy = eye["center"]
    r = eye["radius"]
    pts = []
    for y in range(y0, y1):
        for x in range(x0, x1):
            if not sclera[y, x]:
                continue
            d = np.hypot(x - cx, y - cy)
            if not (0.6 * r < d < 1.5 * r):
                continue
            # Step toward the guessed centre: an iris edge point has dark pixels inward
            ux, uy = (cx - x) / d, (cy - y) / d
            ix, iy = int(round(x + ux * 3)), int(round(y + uy * 3))
            if lum[iy, ix] < 80 and not sclera[iy, ix]:
                pts.append((x + ux * 1.5, y + uy * 1.5))
    pts = np.array(pts, float)
    for _ in range(4):  # least-squares circle fit, dropping outliers each round
        A = np.column_stack([2 * pts[:, 0], 2 * pts[:, 1], np.ones(len(pts))])
        b = (pts ** 2).sum(axis=1)
        (fx, fy, c), *_ = np.linalg.lstsq(A, b, rcond=None)
        fr = np.sqrt(c + fx * fx + fy * fy)
        err = np.abs(np.hypot(pts[:, 0] - fx, pts[:, 1] - fy) - fr)
        pts = pts[err < max(1.5, np.percentile(err, 75))]
    return (float(fx), float(fy)), float(fr)


def eye_opening(rgb, alpha, eye):
    """Pixels inside the eyelids: visible sclera plus the unoccluded part of the iris."""
    x0, y0, x1, y1 = eye["box"]
    h, w = alpha.shape
    region = np.zeros((h, w), bool)
    region[y0:y1, x0:x1] = True

    r = eye["radius"]
    lum = luminance(rgb)
    dist = disk((h, w), eye["center"], r)
    sclera = region & is_sclera(rgb, lum) & (dist > r - 1)

    # The lids are smooth curves: fit them to the sclera's top and bottom edges
    # on either side of the iris, then keep the part of the iris between them.
    # Columns beside the iris only (next to it the sclera is bounded by the iris),
    # plus the measured lid positions through the iris center as heavy anchors.
    cx = eye["center"][0]
    cols = np.array([x for x in np.nonzero(sclera.any(axis=0))[0] if abs(x - cx) > r + 0.5])
    tops = np.array([np.nonzero(sclera[:, x])[0].min() for x in cols], float)
    bottoms = np.array([np.nonzero(sclera[:, x])[0].max() for x in cols], float)
    xs = np.append(cols, [cx] * 3)
    weights = np.append(np.ones(len(cols)), [len(cols)] * 3)
    upper = np.poly1d(np.polyfit(xs, np.append(tops, [eye["lids"][0]] * 3), 2, w=weights))
    lower = np.poly1d(np.polyfit(xs, np.append(bottoms, [eye["lids"][1]] * 3), 2, w=weights))
    yy, xx = np.mgrid[0:h, 0:w]
    iris = (dist <= r) & (yy >= upper(xx)) & (yy <= lower(xx))
    eye["lid_curves"] = (upper, lower)

    # Bridge the thin dark limbal ring, fill holes, keep the eye blob.
    opening = ndimage.binary_closing(sclera | iris, iterations=2) & region
    opening = ndimage.binary_fill_holes(opening)
    labels, n = ndimage.label(opening)
    if n > 1:
        sizes = ndimage.sum(opening, labels, range(1, n + 1))
        opening = labels == (int(np.argmax(sizes)) + 1)
    return opening


def rebuild_iris(rgb, opening, eye):
    """Iris layer with the parts hidden under the eyelids reconstructed by mirroring."""
    h, w = opening.shape
    cx, cy = eye["center"]
    r = eye["radius"]
    dist = disk((h, w), (cx, cy), r)
    inside = dist <= r + 2.0
    visible = inside & opening

    out = np.zeros((h, w, 4), np.float32)
    fallback = rgb[visible & (dist > r * 0.55)].mean(axis=0)
    ys, xs = np.nonzero(inside)
    for y, x in zip(ys, xs):
        candidates = (
            (y, x),
            (int(round(2 * cy - y)), x),
            (y, int(round(2 * cx - x))),
            (int(round(2 * cy - y)), int(round(2 * cx - x))),
        )
        for sy, sx in candidates:
            if 0 <= sy < h and 0 <= sx < w and visible[sy, sx]:
                out[y, x, :3] = rgb[sy, sx]
                break
        else:
            out[y, x, :3] = fallback
    # Soft round edge, a little past the limbal ring so it overlaps the painted sclera
    out[..., 3] = np.clip(r + 2.0 - dist, 0, 1) * 255
    return out


def paint_sclera(rgb, opening, paint_area, eye):
    """Paint sclera over the iris in the base layer.

    The hole is filled by normalised convolution from the surrounding visible
    sclera, coarse to fine, so the eyeball's shading carries through smoothly.
    Only pixels inside `paint_area` (the final eye mask) are painted, so the
    base and the masked iris layer meet with no light seam.
    """
    cx, cy = eye["center"]
    r = eye["radius"]
    h, w = opening.shape
    dist = disk((h, w), (cx, cy), r)
    target = paint_area & (dist <= r + 2.0)
    known = (opening & (dist > r + 2.0)).astype(np.float32)

    fill = np.zeros_like(rgb)
    filled = np.zeros((h, w), bool)
    for sigma in (2, 4, 8, 16, 32):
        weight = ndimage.gaussian_filter(known, sigma)
        ok = (weight > 1e-3) & ~filled
        for c in range(3):
            blurred = ndimage.gaussian_filter(rgb[..., c] * known, sigma)
            fill[..., c] = np.where(ok, blurred / np.maximum(weight, 1e-6), fill[..., c])
        filled |= ok

    out = rgb.copy()
    out[target] = fill[target]
    return out


def diffuse_fill(rgb, hole, iterations=4000):
    """Fill `hole` by harmonic (Laplace) interpolation from its surroundings."""
    ys, xs = np.nonzero(hole)
    y0, y1 = max(ys.min() - 2, 0), ys.max() + 3
    x0, x1 = max(xs.min() - 2, 0), xs.max() + 3
    u = rgb[y0:y1, x0:x1].copy()
    m = hole[y0:y1, x0:x1]
    u[m] = u[~m].mean(axis=0)
    for _ in range(iterations):
        avg = (np.roll(u, 1, 0) + np.roll(u, -1, 0) + np.roll(u, 1, 1) + np.roll(u, -1, 1)) / 4
        u[m] = avg[m]
    out = rgb.copy()
    out[y0:y1, x0:x1] = u
    return out


def closed_eye(rgb, opening, eye, out):
    """Paint a closed eye into `out` (RGBA float): skin over the opening and lash
    line, with a soft curved lash line where the lids meet."""
    h, w = opening.shape
    lum = luminance(rgb)
    cover = ndimage.binary_dilation(opening, iterations=8)
    # Dark lashes/shadow touching the cover join the hole, so only skin feeds the fill
    near = ndimage.binary_dilation(cover, iterations=6) & ~cover
    hole = cover | (near & (lum < 90))
    fill = diffuse_fill(rgb, hole)

    alpha = ndimage.gaussian_filter(cover.astype(np.float32), 2.5)
    region = alpha > 0.01
    out[region, :3] = fill[region]
    out[..., 3] = np.maximum(out[..., 3], alpha * 255)

    # Lash line: corner to corner, sagging into a soft downward curve
    ys, xs = np.nonzero(opening)
    left_x, right_x = xs.min(), xs.max()
    left_y = ys[xs == left_x].mean()
    right_y = ys[xs == right_x].mean()
    sag = (ys.max() - ys.min()) * 0.3
    k = 4
    canvas = Image.new("L", (w * k, h * k), 0)
    draw = ImageDraw.Draw(canvas)
    pts = []
    for t in np.linspace(0.04, 0.96, 48):
        x = left_x + (right_x - left_x) * t
        y = left_y + (right_y - left_y) * t + sag * np.sin(np.pi * t)
        pts.append((x * k, y * k))
    # Thicker in the middle, like real lashes
    for width, span in ((3.2, (8, 40)), (2.2, (0, 48))):
        draw.line(pts[span[0] : span[1]], fill=255, width=int(width * k), joint="curve")
    line = np.asarray(canvas.resize((w, h), Image.LANCZOS)).astype(np.float32) / 255
    lash = np.array([40, 16, 8], np.float32)
    out[..., :3] = out[..., :3] * (1 - line[..., None]) + lash * line[..., None]
    out[..., 3] = np.maximum(out[..., 3], line * 255)


def ear_mask(rgb, alpha, box):
    """Dark fur pixels in the box that are not part of the cap (fill + outline)."""
    h, w = alpha.shape
    x0, y0, x1, y1 = box
    region = np.zeros((h, w), bool)
    region[y0:y1, x0:x1] = True
    lum = luminance(rgb)
    cap_fill = (lum > 170) & (alpha > 200)
    cap = ndimage.binary_dilation(cap_fill, iterations=7)
    fur = region & (alpha > 0) & (lum < 110) & ~cap
    labels, n = ndimage.label(fur)
    sizes = ndimage.sum(fur, labels, range(1, n + 1))
    fur = labels == (int(np.argmax(sizes)) + 1)
    # Include the soft anti-aliased fringe around the fur
    fringe = ndimage.binary_dilation(fur, iterations=2) & region & ~cap
    return fur | fringe


def save(arr, name):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA").save(OUT_DIR / name, optimize=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("--preview", help="directory for debug previews")
    args = ap.parse_args()

    src = np.asarray(Image.open(args.source).convert("RGBA")).astype(np.float32)
    rgb, alpha = src[..., :3], src[..., 3]
    h, w = alpha.shape
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    body = src.copy()
    mask = np.zeros((h, w), np.float32)
    closed = np.zeros_like(src)
    css = []
    pct = lambda v, total: f"{v / total * 100:.2f}%"
    for side, eye in EYES.items():
        eye["center"], eye["radius"] = refine_iris(rgb, eye)
        print(f"{side} iris: center ({eye['center'][0]:.1f}, {eye['center'][1]:.1f}), radius {eye['radius']:.1f}")
        opening = eye_opening(rgb, alpha, eye)
        ys, xs = np.nonzero(opening)
        x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
        # Eyelid colour: skin just above the lash line, over the iris
        cx = int(eye["center"][0])
        lid = rgb[y0 - 18 : y0 - 13, cx - 6 : cx + 6].reshape(-1, 3).mean(axis=0).astype(int)
        css.append(
            f"--{side}-eye-x: {pct(x0, w)}; --{side}-eye-y: {pct(y0, h)}; "
            f"--{side}-eye-w: {pct(x1 - x0, w)}; --{side}-eye-h: {pct(y1 - y0, h)}; "
            f"/* lid colour rgb({lid[0]}, {lid[1]}, {lid[2]}) */"
        )
        iris = rebuild_iris(rgb, opening, eye)
        save(iris, f"{side}-iris.png")
        # Slight erosion so the moving iris never paints over the lash line
        eroded = ndimage.binary_erosion(opening, iterations=1)
        body[..., :3] = paint_sclera(body[..., :3], opening, eroded, eye)
        mask = np.maximum(mask, eroded.astype(np.float32))
        closed_eye(rgb, opening, eye, closed)

    save(closed, "closed-eyes.png")
    ys, _ = np.nonzero(closed[..., 3] > 128)
    css.append(f"--lids-top: {pct(ys.min(), h)}; --lids-bottom: {pct(ys.max() + 1, h)};")

    mask = ndimage.gaussian_filter(mask, 0.6)
    mask_img = np.zeros((h, w, 4), np.float32)
    mask_img[..., :3] = 255
    mask_img[..., 3] = np.clip(mask * 255, 0, 255)
    save(mask_img, "eye-mask.png")

    for side, box in EARS.items():
        m = ear_mask(rgb, alpha, box)
        ear = np.zeros_like(src)
        ear[m] = src[m]
        save(ear, f"{side}-ear.png")
        body[m, 3] = 0
        ys, xs = np.nonzero(m)
        # Pivot where the ear tucks behind the cap: bottom-centre of the fur
        css.append(f"--{side}-ear-pivot: {pct(xs.mean(), w)} {pct(ys.max(), h)};")

    save(body, "body.png")

    if args.preview:
        prev = Path(args.preview)
        prev.mkdir(parents=True, exist_ok=True)
        tint = src.copy()
        tint[mask > 0.5, :3] = tint[mask > 0.5, :3] * 0.4 + np.array([0, 255, 0]) * 0.6
        for box in EARS.values():
            m = ear_mask(rgb, alpha, box)
            tint[m, :3] = tint[m, :3] * 0.4 + np.array([255, 0, 255]) * 0.6
        Image.fromarray(np.clip(tint, 0, 255).astype(np.uint8), "RGBA").save(prev / "masks.png")

    print("Layers written to", OUT_DIR)
    print("CSS values for PandaAvatar.css:")
    print(f"  --avatar-aspect: {w} / {h};")
    for line in css:
        print("  " + line)


if __name__ == "__main__":
    main()
