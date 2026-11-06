#!/usr/bin/env python3
"""Regenerate Astrojanta brand favicons from the Logo SVG mark (gold circle + sparkle star).

All icons live in apps/web/public so they have stable, unhashed URLs. Icon <link> tags are declared
once in apps/web/src/app/layout.tsx (metadata.icons) and the PWA list in manifest.ts — there are no
file-based icon conventions under src/app, so Next.js does not emit duplicate tags.
"""
from __future__ import annotations

import io
import struct
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "apps" / "web" / "public"

NIGHT = (7, 6, 26, 255)
GOLD_300 = (253, 227, 167, 255)
GOLD_500 = (242, 181, 68, 255)
GOLD_600 = (217, 150, 42, 255)
SAFFRON = (232, 140, 48, 255)
STAR = NIGHT
STAR_PTS_24 = [
    (12, 2),
    (13.8, 8.2),
    (20, 10),
    (13.8, 11.8),
    (12, 18),
    (10.2, 11.8),
    (4, 10),
    (10.2, 8.2),
]
SPARKLES_24 = [((19, 19), 1.6), ((5, 19), 1.0)]


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(4))


def draw_gold_circle(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float) -> None:
    steps = max(24, int(r))
    for i in range(steps, 0, -1):
        t = 1 - (i / steps)
        color = (
            lerp(GOLD_300, GOLD_500, t / 0.55)
            if t < 0.55
            else lerp(GOLD_500, SAFFRON, (t - 0.55) / 0.45)
        )
        rr = r * (i / steps)
        ox = cx + (t * r * 0.08)
        oy = cy + (t * r * 0.06)
        draw.ellipse([ox - rr, oy - rr, ox + rr, oy + rr], fill=color)
    draw.ellipse(
        [cx - r, cy - r, cx + r, cy + r],
        outline=GOLD_600,
        width=max(1, int(r * 0.03)),
    )


def make_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), NIGHT)
    draw = ImageDraw.Draw(img)
    pad = size * 0.08
    cx = cy = size / 2
    r = size / 2 - pad
    draw_gold_circle(draw, cx, cy, r)
    box = r * 2 * 0.58
    scale = box / 24
    ox = cx - 12 * scale
    oy = cy - 12 * scale
    draw.polygon([(ox + x * scale, oy + y * scale) for x, y in STAR_PTS_24], fill=STAR)
    if size >= 32:
        for (sx, sy), rad in SPARKLES_24:
            px, py = ox + sx * scale, oy + sy * scale
            rr = max(1.0, rad * scale)
            draw.ellipse([px - rr, py - rr, px + rr, py + rr], fill=STAR)
    return img


def write_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)
    print(f"wrote {path.relative_to(ROOT)} ({img.size[0]}x{img.size[1]})")


def write_ico(path: Path, sizes: list[int]) -> None:
    """PNG-compressed multi-size ICO (16/32/48) — Google wants multiples of 48px available."""

    def png_bytes(img: Image.Image) -> bytes:
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        return buf.getvalue()

    entries: list[bytes] = []
    blobs: list[bytes] = []
    offset = 6 + 16 * len(sizes)
    for s in sizes:
        data = png_bytes(make_icon(s))
        w = 0 if s >= 256 else s
        h = 0 if s >= 256 else s
        entries.append(struct.pack("<BBBBHHII", w, h, 0, 0, 1, 32, len(data), offset))
        blobs.append(data)
        offset += len(data)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(struct.pack("<HHH", 0, 1, len(sizes)) + b"".join(entries) + b"".join(blobs))
    print(f"wrote {path.relative_to(ROOT)} sizes={sizes}")


def main() -> None:
    write_png(make_icon(180), PUBLIC / "apple-touch-icon.png")
    write_png(make_icon(48), PUBLIC / "icons" / "icon-48.png")
    write_png(make_icon(192), PUBLIC / "icons" / "icon-192.png")
    write_png(make_icon(512), PUBLIC / "icons" / "icon-512.png")
    write_png(make_icon(512), PUBLIC / "logo.png")
    write_ico(PUBLIC / "favicon.ico", [16, 32, 48])


if __name__ == "__main__":
    main()
