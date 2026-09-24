#!/bin/bash

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")

cd "$PROJECT_ROOT"

INTEGRATIONS_TO_REMOVE=()
RUN_CHECKS=false

while [[ $# -gt 0 ]]; do
	case $1 in
		--resend)
			INTEGRATIONS_TO_REMOVE+=("resend")
			shift
			;;
		--sentry)
			INTEGRATIONS_TO_REMOVE+=("sentry")
			shift
			;;
		--playwright)
			INTEGRATIONS_TO_REMOVE+=("playwright")
			shift
			;;
		--k6)
			INTEGRATIONS_TO_REMOVE+=("k6")
			shift
			;;
		--knip)
			INTEGRATIONS_TO_REMOVE+=("knip")
			shift
			;;
		--github-actions)
			INTEGRATIONS_TO_REMOVE+=("github-actions")
			shift
			;;
		--google-analytics)
			INTEGRATIONS_TO_REMOVE+=("google-analytics")
			shift
			;;
		--cookiebot)
			INTEGRATIONS_TO_REMOVE+=("cookiebot")
			shift
			;;
		--example-page)
			INTEGRATIONS_TO_REMOVE+=("example-page")
			shift
			;;
		--upstash)
			INTEGRATIONS_TO_REMOVE+=("upstash")
			shift
			;;
		--vercel-analytics)
			INTEGRATIONS_TO_REMOVE+=("vercel-analytics")
			shift
			;;
		--configcat)
			INTEGRATIONS_TO_REMOVE+=("configcat")
			shift
			;;
		--check)
			RUN_CHECKS=true
			shift
			;;
		--help|-h)
			echo "Usage: $0 [options]"
			echo "Options:"
			echo "  --resend              Remove Resend integration"
			echo "  --sentry              Remove Sentry integration"
			echo "  --playwright          Remove Playwright integration"
			echo "  --k6                  Remove K6 integration"
			echo "  --knip                Remove Knip integration"
			echo "  --github-actions      Remove GitHub Actions integration"
			echo "  --google-analytics    Remove Google Analytics integration"
			echo "  --cookiebot           Remove Cookiebot integration"
			echo "  --example-page        Remove example page"
			echo "  --upstash             Remove Upstash integration"
			echo "  --vercel-analytics    Remove Vercel Analytics integration"
			echo "  --configcat           Remove ConfigCat integration"
			echo "  --check               Run format, lint, typecheck, and build after removal (CLI mode only)"
			echo "  --help, -h            Show this help message"
			echo ""
			echo "If no options are provided, an interactive dialog will be shown."
			echo "Note: In dialog mode, you can choose to run checks via a checkbox option."
			exit 0
			;;
		*)
			echo "Unknown option: $1"
			echo "Use --help for usage information"
			exit 1
			;;
	esac
done

process_command_line_integrations() {
	if [ ${#INTEGRATIONS_TO_REMOVE[@]} -eq 0 ]; then
		return 1
	fi

	echo "The following integrations will be removed:"
	for integration in "${INTEGRATIONS_TO_REMOVE[@]}"; do
		case $integration in
			resend) echo "  - Resend integration" ;;
			sentry) echo "  - Sentry integration" ;;
			playwright) echo "  - Playwright integration" ;;
			k6) echo "  - K6 integration" ;;
			knip) echo "  - Knip integration" ;;
			github-actions) echo "  - GitHub Actions integration" ;;
			google-analytics) echo "  - Google Analytics integration" ;;
			cookiebot) echo "  - Cookiebot integration" ;;
			example-page) echo "  - Example page" ;;
			upstash) echo "  - Upstash integration" ;;
			vercel-analytics) echo "  - Vercel Analytics integration" ;;
			configcat) echo "  - ConfigCat integration" ;;
		esac
	done

	if [ "$RUN_CHECKS" = true ]; then
		echo "  - Verification checks (format, lint, typecheck, build) will run after removal"
	fi

	echo ""
	read -p "Do you want to continue? (y/N): " confirm
	if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
		echo "Operation cancelled."
		exit 0
	fi

	for integration in "${INTEGRATIONS_TO_REMOVE[@]}"; do
		case $integration in
			resend) remove_resend ;;
			sentry) remove_sentry ;;
			playwright) remove_playwright ;;
			k6) remove_k6 ;;
			knip) remove_knip ;;
			github-actions) remove_github_actions ;;
			google-analytics) remove_google_analytics ;;
			cookiebot) remove_cookiebot ;;
			example-page) remove_example_page ;;
			upstash) remove_upstash ;;
			vercel-analytics) remove_vercel_analytics ;;
			configcat) remove_configcat ;;
		esac
	done

	return 0
}

if process_command_line_integrations; then
	rmdir tests 2>/dev/null || true

	if [ "$RUN_CHECKS" = true ]; then
		echo "Running verification checks..."
		pnpm format
		pnpm lint:fix
		pnpm typecheck
		pnpm build
	fi

	exit 0
fi

if ! command -v dialog >/dev/null 2>&1; then
	echo 'dialog is required. Install it with: brew install dialog, or use the equivalent package manager for your OS (such as APT, YUM, or another).' >&2
	echo 'Alternatively, use command-line arguments. Run --help for more information.' >&2
	exit 1
fi

remove_resend() {
	if grep -Fq '"resend":' package.json; then
		pnpm remove resend
	fi

	if grep -Fqx "export * from './resend';" src/lib/index.ts; then
		sed -i '' "/^export \* from '\.\/resend';$/d" src/lib/index.ts
	fi

	sed -i '' '/^[[:space:]]*RESEND_API_KEY:/d' src/environment.ts
	sed -i '' '/^[[:space:]]*RESEND_API_KEY:/d' .github/workflows/continuous-integration.yml

	rm -f src/lib/resend.ts
}

remove_google_analytics() {
	if grep -Fq '"@next/third-parties":' package.json; then
		pnpm remove @next/third-parties
	fi

	sed -i '' "/^import { GoogleAnalytics } from '@next\/third-parties\/google';$/d" src/app/layout.tsx
	sed -i '' '/^[[:space:]]*{environment\.GOOGLE_ANALYTICS_ID && ($/,/^[[:space:]]*)}$/d' src/app/layout.tsx
	sed -i '' '/^[[:space:]]*GOOGLE_ANALYTICS_ID:/d' src/environment.ts
}

remove_vercel_analytics() {
	if grep -Fq '"@vercel/analytics":' package.json; then
		pnpm remove @vercel/analytics
	fi

	sed -i '' "/^import { Analytics } from '@vercel\/analytics';$/d" src/app/layout.tsx
	sed -i '' '/^[[:space:]]*{environment\.VERCEL_WEB_ANALYTICS_ENABLED && ($/,/^[[:space:]]*)}$/d' src/app/layout.tsx
	sed -i '' '/^[[:space:]]*VERCEL_WEB_ANALYTICS_ENABLED:/d' src/environment.ts
	sed -i '' '/^[[:space:]]*VERCEL_WEB_ANALYTICS_DEBUG_ENABLED:/d' src/environment.ts
}

remove_configcat() {
	if grep -Fq '"@configcat/sdk":' package.json; then
		pnpm remove @configcat/sdk
	fi

	if grep -Fqx "export * from './configcat';" src/lib/index.ts; then
		sed -i '' "/^export \* from '\.\/configcat';$/d" src/lib/index.ts
	fi

	sed -i '' '/^[[:space:]]*CONFIGCAT_SDK_KEY:/d' src/environment.ts

	rm -f src/lib/configcat.ts
}

remove_cookiebot() {
	sed -i '' "/^import Script from 'next\/script';$/d" src/app/layout.tsx
	sed -i '' '/^[[:space:]]*{environment\.COOKIEBOT_ID && ($/,/^[[:space:]]*)}$/d' src/app/layout.tsx
	sed -i '' '/^[[:space:]]*COOKIEBOT_(ID|BLOCKING_MODE):/d' src/environment.ts
}

remove_sentry() {
	if grep -Fq '"@sentry/nextjs":' package.json; then
		pnpm remove @sentry/nextjs
	fi

	sed -i '' "/^import { withSentryConfig } from '@sentry\/nextjs';$/d" next.config.ts
	sed -i '' "/^import { environment } from '~\/environment';$/d" next.config.ts

  if ! grep -Fqx "import '~/environment';" next.config.ts; then
		sed -i '' "1a\\
import '~/environment';" next.config.ts
	fi

	if grep -Fqx 'export default withSentryConfig(nextConfig, {' next.config.ts; then
		sed -i '' '/^export default withSentryConfig(nextConfig, {$/,$d' next.config.ts
	fi

	if ! grep -Fqx 'export default nextConfig;' next.config.ts; then
		printf '\nexport default nextConfig;\n' >> next.config.ts
	fi

	sed -E -i '' '/^[[:space:]]*(NEXT_PUBLIC_)?SENTRY_(ORG|PROJECT|DSN):/d' src/environment.ts
	sed -E -i '' '/^[[:space:]]*(NEXT_PUBLIC_)?SENTRY_(ORG|PROJECT|DSN):/d' .github/workflows/continuous-integration.yml
	sed -i '' "/^[[:space:]]*'@sentry\/cli':/d" pnpm-workspace.yaml
	sed -i '' '/^\[!\[Sentry\]/d' README.md

	rm -f sentry.edge.config.ts sentry.server.config.ts .env.sentry-build-plugin src/instrumentation.ts src/instrumentation-client.ts src/app/global-error.tsx
}

remove_playwright() {
	if grep -Fq '"@playwright/test":' package.json; then
		pnpm remove @playwright/test
	fi

	sed -i '' '/^[[:space:]]*"test:e2e":/d' package.json
	sed -i '' '/^[[:space:]]*"test:e2e:setup":/d' package.json
	sed -i '' '/^[[:space:]]*"ms-playwright\.playwright",$/d' .vscode/extensions.json
	sed -i '' '/^[[:space:]]*-[[:space:]]*name: End-to-end test$/,/^[[:space:]]*run: \.github\/scripts\/e2e-test\.sh$/d' .github/workflows/continuous-integration.yml
	sed -i '' '/^\[!\[Playwright\]/d' README.md
	sed -i '' '/^- Playwright for end-to-end testing$/d' README.md
	sed -i '' '/pnpm test:e2e/d' README.md

	rm -rf tests/e2e playwright.config.ts .github/scripts/e2e-test.sh
}

remove_k6() {
	if grep -Fq '"@types/k6":' package.json; then
		pnpm remove @types/k6
	fi

	sed -i '' '/^\[!\[K6\]/d' README.md
	sed -i '' "s/, 'tests\/load\/\*\*\/\*\.ts'//" eslint.config.mjs

	rm -rf tests/load .github/workflows/load-testing.yml
}

remove_upstash() {
	if grep -Fq '"@upstash/ratelimit":' package.json; then
		pnpm remove @upstash/ratelimit @upstash/redis
	fi

	rm -f src/proxy.ts
	rm -f tests/load/src/rate-limit-test.ts

	sed -i '' '/^[[:space:]]*UPSTASH_REDIS_REST_URL:/d' src/environment.ts
	sed -i '' '/^[[:space:]]*UPSTASH_REDIS_REST_TOKEN:/d' src/environment.ts
	sed -i '' '/^[[:space:]]*UPSTASH_REDIS_REST_URL:/d' .github/workflows/continuous-integration.yml
	sed -i '' '/^[[:space:]]*UPSTASH_REDIS_REST_TOKEN:/d' .github/workflows/continuous-integration.yml
}

remove_knip() {
	if grep -Fq '"knip":' package.json; then
		pnpm remove knip
	fi

	sed -i '' '/^[[:space:]]*"lint:dependencies":/d' package.json
	sed -i '' '/^[[:space:]]*-[[:space:]]*name: Lint dependencies$/,/^[[:space:]]*run: \.github\/scripts\/lint-dependencies\.sh$/d' .github/workflows/continuous-integration.yml
	sed -i '' '/^\[!\[Knip\]/d' README.md

	rm -f .github/scripts/lint-dependencies.sh knip.config.ts
}

remove_github_actions() {
	sed -i '' '/^\[!\[GitHub Actions\]/d' README.md

	rm -rf .github
}

remove_example_page() {
	rm -rf src/components/layout/CallToActionSection
	rm -rf src/components/layout/ConnectionStatus
	rm -rf src/components/layout/Footer
	rm -rf src/components/layout/Header
	rm -rf src/components/layout/HeroSection
	rm -rf src/components/layout/ProblemSection
	rm -rf src/components/layout/TechStackSection
	rm -rf src/components/layout/WorkflowSection

	echo "export * from './ServiceWorkerRegistration';" > src/components/layout/index.ts

	cat > src/app/page.tsx << 'EOF'
import type { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <main data-testid="home-wrapper">
      <h1>Next.js Template</h1>
    </main>
  );
}
EOF

	sed -i '' 's/Footer, //g' src/app/layout.tsx
	sed -i '' 's/Header, //g' src/app/layout.tsx
	sed -i '' '/^[[:space:]]*<Header \/>$/d' src/app/layout.tsx
	sed -i '' '/^[[:space:]]*<Footer \/>$/d' src/app/layout.tsx

	sed -i '' 's/bg-slate-50 //g' src/app/layout.tsx
	sed -i '' 's/text-slate-800 //g' src/app/layout.tsx
	sed -i '' 's/selection:bg-indigo-500 //g' src/app/layout.tsx
	sed -i '' 's/selection:text-white//g' src/app/layout.tsx
}

options=(
	1 'Remove Resend integration' off
	2 'Remove Sentry integration' off
	3 'Remove Playwright integration' off
	4 'Remove K6 integration' off
	5 'Remove Knip integration' off
	6 'Remove GitHub Actions integration' off
	7 'Remove Google Analytics integration' off
	8 'Remove Cookiebot integration' off
	9 'Remove example page' off
	10 'Remove Upstash integration' off
	11 'Remove Vercel Analytics integration' off
	12 'Remove ConfigCat integration' off
	13 'Run verification checks (format, lint, typecheck, build)' off
)

choices=$(dialog \
	--backtitle 'Next.js Template' \
	--separate-output \
	--checklist 'Select integrations to remove' 24 60 13 \
	"${options[@]}" 2>&1 >/dev/tty || true)

selected=false
run_checks=false

while IFS= read -r choice; do
	case "$choice" in
		1)
			remove_resend
			selected=true
			;;
		2)
			remove_sentry
			selected=true
			;;
		3)
			remove_playwright
			selected=true
			;;
		4)
			remove_k6
			selected=true
			;;
		5)
			remove_knip
			selected=true
			;;
		6)
			remove_github_actions
			selected=true
			;;
		7)
			remove_google_analytics
			selected=true
			;;
		8)
			remove_cookiebot
			selected=true
			;;
		9)
			remove_example_page
			selected=true
			;;
		10)
			remove_upstash
			selected=true
			;;
		11)
			remove_vercel_analytics
			selected=true
			;;
		12)
			remove_configcat
			selected=true
			;;
		13)
			run_checks=true
			;;
	esac
done <<EOF
$choices
EOF

rmdir tests 2>/dev/null || true

if [ "$run_checks" = true ]; then
	echo "Running verification checks..."
	pnpm format
	pnpm lint:fix
	pnpm typecheck
	pnpm build
fi
