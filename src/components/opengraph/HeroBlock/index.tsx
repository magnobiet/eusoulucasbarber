import type { ReactElement } from 'react';

export function HeroBlock({
  context,
}: Readonly<{ context: OpenGraphConfig }>): ReactElement {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          maxWidth: 820,
          color: context.colors.text,
          fontFamily: 'Inter',
        }}
      >
        {context.title}
      </div>

      <div
        style={{
          fontSize: 30,
          color: context.colors.muted,
          maxWidth: 760,
          fontWeight: 400,
          fontFamily: 'Inter',
        }}
      >
        {context.subtitle}
      </div>
    </div>
  );
}
