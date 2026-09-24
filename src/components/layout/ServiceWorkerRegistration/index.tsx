'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

const RELOAD_FLAG = 'sw-reloading';

export function ServiceWorkerRegistration(): null {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const notifyUpdate = (worker: ServiceWorker): void => {
      toast('Nova versão disponível', {
        duration: Infinity,
        action: {
          label: 'Atualizar',
          onClick: () => worker.postMessage({ type: 'SKIP_WAITING' }),
        },
      });
    };

    const onControllerChange = (): void => {
      if (sessionStorage.getItem(RELOAD_FLAG)) {
        return;
      }

      sessionStorage.setItem(RELOAD_FLAG, 'true');
      location.reload();
    };

    const trackInstallingWorker = (worker: ServiceWorker): void => {
      worker.addEventListener('statechange', () => {
        if (
          worker.state === 'installed' &&
          navigator.serviceWorker.controller
        ) {
          notifyUpdate(worker);
        }
      });
    };

    const register = async (): Promise<void> => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');

        if (registration.waiting && navigator.serviceWorker.controller) {
          notifyUpdate(registration.waiting);
        }

        registration.addEventListener('updatefound', () => {
          if (registration.installing) {
            trackInstallingWorker(registration.installing);
          }
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      onControllerChange,
    );
    void register();

    return () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        onControllerChange,
      );
    };
  }, []);

  return null;
}
