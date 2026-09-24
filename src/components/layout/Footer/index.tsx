import Link from 'next/link';
import type { ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <footer
      data-testid="footer"
      className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500"
    >
      <p>
        Next.js Template • Uma base para sites e landing pages • Licenciado sob
        a licença{' '}
        <Link
          href="https://license.magnobiet.com/mit/2026"
          className="text-blue-600 underline hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT
        </Link>
        .
      </p>
    </footer>
  );
}
