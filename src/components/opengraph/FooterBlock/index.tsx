import type { ReactElement } from 'react';
import type { OpenGraphConfig } from '~/config/schema';

export function FooterBlock({
  context,
}: Readonly<{ context: OpenGraphConfig }>): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
      }}
    >
      <div
        style={{
          color: context.colors.muted,
          fontSize: 18,
          fontFamily: 'Inter',
        }}
      >
        {context.footer}
      </div>
    </div>
  );
}
