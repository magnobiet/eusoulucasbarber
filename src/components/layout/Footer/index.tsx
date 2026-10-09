import type { ReactElement } from 'react';
import { DeveloperSignature } from '~/components/layout';

export function Footer(): ReactElement {
  return (
    <footer
      className="stagger-item mt-auto flex w-full flex-col items-center justify-center pt-4 delay-8"
      data-purpose="developer-brandmark"
    >
      <div className="via-brand-cognac/40 mb-4 h-px w-10 bg-linear-to-r from-transparent to-transparent" />

      <DeveloperSignature
        className="text-brand-cognac p-2"
        utmSource="eusoulucasbarber"
      />
    </footer>
  );
}
