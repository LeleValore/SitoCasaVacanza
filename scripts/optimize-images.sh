#!/bin/bash
# Genera varianti responsive (640w, 1080w) delle foto della galleria per il mobile.
set -e
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)

for f in img/*.webp; do
  base=$(basename "$f" .webp)
  [ "$base" = "catania-bg" ] && continue
  [ -f "img/${base}-640.webp" ] && [ -f "img/${base}-1080.webp" ] && continue

  dwebp "$f" -o "$TMP/$base.png" >/dev/null 2>&1
  cwebp -quiet -q 78 -resize 640 0 "$TMP/$base.png" -o "img/${base}-640.webp"
  cwebp -quiet -q 80 -resize 1080 0 "$TMP/$base.png" -o "img/${base}-1080.webp"
  echo "ok: $base"
done

rm -rf "$TMP"
