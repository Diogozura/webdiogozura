import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStoredConsent, setStoredConsent } from '@/src/lib/consent';
import styles from './CookieConsent.module.css';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  function choose(value: 'accepted' | 'rejected') {
    setStoredConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <p>
        Usamos cookies para analisar o uso do site e melhorar sua experiência. Você pode aceitar ou
        recusar os cookies não essenciais a qualquer momento. Saiba mais na{' '}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.reject} onClick={() => choose('rejected')}>
          Recusar
        </button>
        <button type="button" className={styles.accept} onClick={() => choose('accepted')}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
