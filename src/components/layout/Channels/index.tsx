import { SiInstagram, SiWhatsapp } from '@icons-pack/react-simple-icons';
import { ChevronRight, Link2, MapPin } from 'lucide-react';
import type { ReactElement } from 'react';
import { config } from '~/config';
import type { SocialNetwork } from '~/config';

interface Channel {
  id: string;
  href: string;
  icon: ReactElement;
  title: string;
  detail: string;
  detailClassName: string;
}

type Platform = SocialNetwork['platform'];

const platforms: Partial<
  Record<Platform, Pick<Channel, 'icon' | 'title' | 'detailClassName'>>
> = {
  whatsapp: {
    icon: <SiWhatsapp aria-hidden className="h-5 w-5 fill-current" title="" />,
    title: 'WhatsApp',
    detailClassName: 'text-cream-subtle',
  },
  instagram: {
    icon: <SiInstagram aria-hidden className="h-5 w-5 fill-current" title="" />,
    title: 'Instagram',
    detailClassName: 'text-brand-cognac',
  },
};

function toChannel({ platform, url, handle }: SocialNetwork): Channel {
  const {
    icon = <Link2 className="h-5 w-5" />,
    title = handle,
    detailClassName = 'text-cream-subtle',
  } = platforms[platform] ?? {};

  return {
    id: `${platform}-${handle}`,
    href: url,
    icon,
    title,
    detail: platform === 'instagram' ? `@${handle}` : handle,
    detailClassName,
  };
}

const channels: Array<Channel> = [
  ...(config.contact?.socialNetworks ?? []).map((network) =>
    toChannel(network),
  ),
  {
    id: 'location',
    href: config.location.mapsUrl,
    icon: <MapPin className="h-5 w-5" />,
    title: 'Endereço',
    detail: config.location.label,
    detailClassName: 'text-cream-subtle',
  },
];

export function Channels(): ReactElement {
  return (
    <section
      className="stagger-item mb-2.5 w-full space-y-2.5 delay-7"
      data-purpose="channels-list"
    >
      <div className="flex items-center justify-between px-1">
        <h2 className="text-cream-dim text-xs font-semibold tracking-wider uppercase">
          Atendimento
        </h2>
      </div>

      {channels.map(({ id, href, icon, title, detail, detailClassName }) => (
        <a
          key={id}
          className="card-coffee group flex items-center justify-between gap-3 rounded-xl p-3.5"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="border-brand-cognac/30 bg-brand-cognac/15 text-brand-cognac flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105">
              {icon}
            </div>
            <div className="min-w-0">
              <span className="group-hover:text-cream-highlight block text-sm font-semibold wrap-break-word text-white transition-colors">
                {title}
              </span>
              <span
                className={`block text-sm wrap-break-word ${detailClassName}`}
              >
                {detail}
              </span>
            </div>
          </div>
          <ChevronRight className="text-cream-dim group-hover:text-brand-cognac h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
        </a>
      ))}
    </section>
  );
}
