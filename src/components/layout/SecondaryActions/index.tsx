import type { ReactElement } from 'react';
import { SaveContactButton } from '../SaveContactButton';

export function SecondaryActions(): ReactElement {
  return (
    <section
      className="stagger-item mb-5 grid w-full gap-2.5 delay-6"
      data-purpose="secondary-actions"
    >
      <SaveContactButton />
    </section>
  );
}
