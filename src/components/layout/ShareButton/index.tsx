'use client';

import { Share2 } from 'lucide-react';
import { type ReactElement } from 'react';
import { toast } from 'sonner';

const shareData = {
  title: 'Lucas Xavier | Barbeiro',
  text: 'Corte de cabelo, barba e visagismo masculino em Caxias do Sul. Atendimento com hora marcada.',
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
      aria-label="Compartilhar"
      className="border-coffee-700 bg-coffee-850 text-brand-cognac hover:border-brand-cognac/50 hover:text-brand-light flex size-11 items-center justify-center rounded-xl border shadow-sm transition-all duration-200 active:scale-90"
      onClick={shareProfile}
      title="Compartilhar perfil"
      type="button"
    >
      <Share2 className="size-4" />
    </button>
  );
}
