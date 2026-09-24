'use client';

import NextError from 'next/error';
import { type ReactElement } from 'react';
import { config } from '~/config';

export default function GlobalError({ }: Readonly<{ error: Error & { digest?: string } }>): ReactElement {
  return (
    <html lang={config.language}>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
