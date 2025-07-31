'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function UTMTracker() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source');
    const medium = params.get('utm_medium');
    const campaign = params.get('utm_campaign');

    if (source || medium || campaign) {
      localStorage.setItem('utm_source', source || '');
      localStorage.setItem('utm_medium', medium || '');
      localStorage.setItem('utm_campaign', campaign || '');
    }
  }, [router]);

  return null; // <- ESSENCIAL! Isso torna um componente válido
}
