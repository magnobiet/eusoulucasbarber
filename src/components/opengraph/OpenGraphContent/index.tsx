import type { ReactElement } from 'react';
import type { OpenGraphConfig } from '~/config/schema';
import { FooterBlock } from '../FooterBlock';
import { HeaderBlock } from '../HeaderBlock';
import { HeroBlock } from '../HeroBlock';

export function OpenGraphContent({
  context,
}: Readonly<{ context: OpenGraphConfig }>): ReactElement {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 52,
        background: `linear-gradient(135deg, ${context.colors.backgroundStart} 0%, ${context.colors.backgroundEnd} 100%)`,
        color: context.colors.text,
        fontFamily: 'Inter',
      }}
    >
      {context.eyebrow && <HeaderBlock context={context} />}

      <HeroBlock context={context} />

      {context.footer && <FooterBlock context={context} />}
    </div>
  );
}
