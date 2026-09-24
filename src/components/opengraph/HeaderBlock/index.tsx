import type { ReactElement } from 'react';
import type { OpenGraphConfig } from '~/config/schema';

export function HeaderBlock({
  context,
}: Readonly<{ context: OpenGraphConfig }>): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          borderRadius: 999,
          background: context.colors.eyebrowBackground,
          border: `1px solid ${context.colors.eyebrowBorder}`,
          color: context.colors.eyebrowText,
          fontSize: 20,
          fontWeight: 700,
          padding: '8px 18px',
          textTransform: 'uppercase',
          fontFamily: 'Outfit',
        }}
      >
        {context.eyebrow}
      </div>
    </div>
  );
}
