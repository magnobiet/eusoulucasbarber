import { Contact } from 'lucide-react';
import type { ReactElement } from 'react';
import { config } from '~/config';
import { slugify } from '~/utils/slugify';

export function SaveContactButton(): ReactElement {
  return (
    <a
      className="border-coffee-700 bg-coffee-850 text-cream hover:border-brand-cognac/40 hover:bg-coffee-800 flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition duration-200 active:scale-95"
      download={`${slugify(config.vcard.fullName)}.vcf`}
      href="/contato.vcf"
      type="text/vcard"
    >
      <Contact className="text-brand-cognac h-4 w-4" />
      <span>Salvar contato</span>
    </a>
  );
}
