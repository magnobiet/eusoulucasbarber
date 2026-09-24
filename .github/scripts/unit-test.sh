#!/usr/bin/env bash

set -o pipefail
set +e

LOG_FILE="/tmp/unit-test.log"

pnpm test:coverage 2>&1 | tee "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}
STATUS=$([ $EXIT_CODE -eq 0 ] && echo '✅ Passed' || echo '❌ Failed')

LOG_CMD=(tail -n +2 "$LOG_FILE")

{
  echo "## Unit Tests — $STATUS"
  echo '```'
  "${LOG_CMD[@]}"
  echo '```'
} >> "$GITHUB_STEP_SUMMARY"

exit "$EXIT_CODE"
