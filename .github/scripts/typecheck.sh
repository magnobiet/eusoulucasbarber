#!/usr/bin/env bash

set -o pipefail
set +e

LOG_FILE="/tmp/typecheck.log"

pnpm typecheck 2>&1 | tee "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}
STATUS=$([ $EXIT_CODE -eq 0 ] && echo '✅ Passed' || echo '❌ Failed')

if [ "$EXIT_CODE" -eq 0 ]; then
  echo "## Typecheck — $STATUS" >> "$GITHUB_STEP_SUMMARY"
else
  LOG_CMD=(cat "$LOG_FILE")

  {
    echo "## Typecheck — $STATUS"
    echo '```'
    "${LOG_CMD[@]}"
    echo '```'
  } >> "$GITHUB_STEP_SUMMARY"
fi

exit "$EXIT_CODE"
