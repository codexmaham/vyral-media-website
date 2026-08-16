#!/usr/bin/env bash
# Compress source portfolio videos for GitHub/Vercel deployment.
# Outputs web-ready H.264 MP4 with faststart for mobile streaming.
set -euo pipefail

SRC="/Users/mm/Documents/Projects/Agency/public/Video Portfolio"
OUT="/Users/mm/Documents/Projects/Agency/public/videos"
mkdir -p "$OUT"

shopt -s nullglob
for input in "$SRC"/*.{mp4,MP4,mov,MOV}; do
  [ -f "$input" ] || continue
  base="$(basename "$input")"
  name="${base%.*}"
  output="$OUT/${name}.mp4"

  if [ -f "$output" ]; then
    echo "skip (exists): $name.mp4"
    continue
  fi

  echo "compressing: $base"
  ffmpeg -hide_banner -loglevel error -y -i "$input" \
    -vf "scale=720:-2:flags=lanczos" \
    -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 27 -preset medium \
    -c:a aac -b:a 96k -ac 2 \
    -movflags +faststart \
    "$output"
done

echo "done — $(ls -1 "$OUT" | wc -l | tr -d ' ') files in public/videos/"
du -sh "$OUT"
