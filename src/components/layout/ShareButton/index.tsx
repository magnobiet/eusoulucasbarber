'use client';

import { Share2 } from 'lucide-react';
import { type ReactElement } from 'react';
import { toast } from 'sonner';
import { config } from '~/config';

const shareData = {
  title: config.pageTitle,
  text: config.description,
};

async function shareProfile(): Promise<void> {
  const url = location.href;

  if (navigator.share) {
    try {
      await navigator.share({ ...shareData, url });

      return;
    } catch {
      // User cancelled or share failed; fall through to clipboard fallback.
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    toast.success('Link do perfil copiado!');
  } catch {
    toast.error('Não foi possível copiar o link.', {
      description: url,
    });
  }
}

export function ShareButton(): ReactElement {
  return (
    <button
      aria-label="Compartilhar perfil"
      className="border-coffee-700 bg-coffee-850 text-brand-cognac hover:border-brand-cognac/50 hover:text-brand-light flex size-11 cursor-pointer items-center justify-center rounded-xl border transition duration-200 active:scale-90"
      onClick={shareProfile}
      title="Compartilhar perfil"
      type="button"
    >
      <Share2 className="size-4" />
    </button>
  );
}
