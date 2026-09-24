#!/usr/bin/env bash

set -o pipefail
set +e

LOG_FILE="/tmp/lint.log"

pnpm lint 2>&1 | tee "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}
STATUS=$([ $EXIT_CODE -eq 0 ] && echo '✅ Passed' || echo '❌ Failed')

if [ "$EXIT_CODE" -eq 0 ]; then
  echo "## Lint — $STATUS" >> "$GITHUB_STEP_SUMMARY"
else
  LOG_CMD=(cat "$LOG_FILE")

  {
    echo "## Lint — $STATUS"
    echo '```'
    "${LOG_CMD[@]}"
    echo '```'
  } >> "$GITHUB_STEP_SUMMARY"
fi

exit "$EXIT_CODE"
