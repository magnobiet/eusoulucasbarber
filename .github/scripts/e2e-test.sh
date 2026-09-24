#!/usr/bin/env bash

set -o pipefail
set +e

LOG_FILE="/tmp/e2e-test.log"

pnpm exec playwright install ffmpeg chromium firefox
pnpm test:e2e 2>&1 | tee "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}
STATUS=$([ $EXIT_CODE -eq 0 ] && echo '✅ Passed' || echo '❌ Failed')

LOG_CMD=(tail -n +5 "$LOG_FILE")

{
  echo "## End-to-End Tests — $STATUS"
  echo '```'
  "${LOG_CMD[@]}"
  echo '```'
} >> "$GITHUB_STEP_SUMMARY"

exit "$EXIT_CODE"
