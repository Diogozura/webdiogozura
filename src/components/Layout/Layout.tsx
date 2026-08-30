import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from '@/src/components/CookieConsent/CookieConsent';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
