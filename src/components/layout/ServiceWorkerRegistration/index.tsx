'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration(): null {
  useEffect(() => {
    async function registerServiceWorker(): Promise<void> {
      if (!('serviceWorker' in navigator)) {
        return;
      }

      try {
        const registration = await navigator.serviceWorker.register('/sw.js');

        console.log(
          'Service Worker registered with scope:',
          registration.scope,
        );
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }

    void registerServiceWorker();
  }, []);

  return null;
}
