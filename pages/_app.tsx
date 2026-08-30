import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { DefaultSeo, SocialProfileJsonLd, LocalBusinessJsonLd } from 'next-seo';
import { ThemeProvider } from '@/src/theme/ThemeContext';
import { Layout } from '@/src/components/Layout/Layout';
import { INSTAGRAM_URL, LINKEDIN_URL } from '@/src/lib/constants';
import { CONSENT_EVENT, getStoredConsent } from '@/src/lib/consent';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    setCookiesAccepted(getStoredConsent() === 'accepted');
    function onConsentChange(e: Event) {
      setCookiesAccepted((e as CustomEvent<'accepted' | 'rejected'>).detail === 'accepted');
    }
    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
  }, []);

  return (
    <>
      <SocialProfileJsonLd
        type="Person"
        name="Diogo zura"
        url="https://www.diogozura.com"
        sameAs={[
          INSTAGRAM_URL,
        ]}
      />
      <LocalBusinessJsonLd
        type="ProfessionalService"
        id="https://www.diogozura.com/#negocio"
        name="Diogo Zura — Automação de Atendimento para Telecom"
        description="Implantação de automação de atendimento com IA (IXC Provedor + OPA Suite) para provedores de internet e empresas de telecom, além de desenvolvimento de sites e sistemas sob medida. Atendimento em Cotia e região de São Paulo, com trabalhos remotos para todo o Brasil."
        url="https://www.diogozura.com"
        address="Cotia, São Paulo"
        geo={{ latitude: '-23.6034', longitude: '-46.9187' }}
        images={['https://www.diogozura.com/hero-link-preview-diogo-zura-v2.png']}
        sameAs={[INSTAGRAM_URL, LINKEDIN_URL]}
      />
      <DefaultSeo
        titleTemplate="%s"
        defaultTitle="Diogo Zura — Automação de Atendimento para Provedores de Internet e Telecom"
        description="Implantação de automação de atendimento com IA (IXC + OPA Suite) para provedores de internet e empresas de telecom, além de sites e sistemas sob medida. Atendimento em Cotia, São Paulo e região, com trabalhos remotos para todo o Brasil."
        canonical="https://www.diogozura.com"
        openGraph={{
          type: 'website',
          url: 'https://www.diogozura.com',
          title: 'Diogo Zura — Automação de Atendimento para Provedores de Internet e Telecom',
          description: 'Implantação de automação de atendimento com IA (IXC + OPA Suite) para provedores de internet e empresas de telecom, além de sites e sistemas sob medida. Atendimento em Cotia, São Paulo e região, com trabalhos remotos para todo o Brasil.',
          locale: 'pt_BR',
          images: [
            {
              url: 'https://www.diogozura.com/hero-link-preview-diogo-zura-v2.png',
              alt: 'Diogo Zura — Automação de atendimento para provedores de internet e telecom',
            },
          ],
        }}
      />

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/logo-simbolo-diogo-zura.png" />
        <link rel="apple-touch-icon" href="/logo-simbolo-diogo-zura.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="automação de atendimento, provedor de internet, ISP, IXC Provedor, OPA Suite, chatbot IA telecom, atendimento automatizado, sites, sistemas web, desenvolvimento web, Cotia, São Paulo"
        />
        <meta name="author" content="Diogo zura" />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="Cotia" />
        <meta name="geo.position" content="-23.6034;-46.9187" />
        <meta name="ICBM" content="-23.6034, -46.9187" />
      </Head>

      {cookiesAccepted && (
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XF60DE225Q" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XF60DE225Q', {
      page_path: window.location.pathname,
    });
  `}
          </Script>
        </>
      )}

      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
