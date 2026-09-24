#!/usr/bin/env bash

set -o pipefail
set +e

LOG_FILE="/tmp/lint-dependencies.log"

pnpm lint:dependencies 2>&1 | tee "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}
STATUS=$([ $EXIT_CODE -eq 0 ] && echo '✅ Passed' || echo '⚠️ Issues found')

LOG_CMD=(sed '1d;$d' "$LOG_FILE")

{
  echo "## Lint Dependencies — $STATUS"
  echo '```'
  "${LOG_CMD[@]}"
  echo '```'
} >> "$GITHUB_STEP_SUMMARY"

exit 0
