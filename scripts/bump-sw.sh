#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SW_PATH="$ROOT/public/sw.js"

if [ ! -f "$SW_PATH" ]; then
  echo "[bump-sw] Service worker not found: $SW_PATH"
  exit 1
fi

COMMIT_HASH="$(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null || echo 'unknown')"

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

sed "s/_HASH_/$COMMIT_HASH/g" "$SW_PATH" > "$TMP_FILE"
mv "$TMP_FILE" "$SW_PATH"

echo "[bump-sw] CACHE_NAME updated with hash: $COMMIT_HASH"
