import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { DefaultSeo, SocialProfileJsonLd, LocalBusinessJsonLd } from 'next-seo';
import { ThemeProvider } from '@/src/theme/ThemeContext';
import { Layout } from '@/src/components/Layout/Layout';
import { INSTAGRAM_URL } from '@/src/lib/constants';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
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
        name="Diogo Zura — Desenvolvimento de Sites"
        description="Desenvolvimento de sites e sistemas sob medida em Cotia e região de São Paulo, com atendimento remoto para todo o Brasil."
        url="https://www.diogozura.com"
        address="Cotia, São Paulo"
        geo={{ latitude: '-23.6034', longitude: '-46.9187' }}
        images={['https://www.diogozura.com/logo-diogo-zura.png']}
        sameAs={[INSTAGRAM_URL]}
        priceRange="A partir de R$ 200"
      />
      <DefaultSeo
        titleTemplate="%s"
        defaultTitle="Diogo Zura — Sites e sistemas sob medida em Cotia e região de SP"
        description="Desenvolvimento de sites a partir de R$200 e soluções sob medida para empresas de telecom e projetos diversos. Atendimento em Cotia, São Paulo e região, com trabalhos remotos para todo o Brasil."
        canonical="https://www.diogozura.com"
        openGraph={{
          type: 'website',
          url: 'https://www.diogozura.com',
          title: 'Diogo Zura — Sites e sistemas sob medida em Cotia e região de SP',
          description: 'Desenvolvimento de sites a partir de R$200 e soluções sob medida para empresas de telecom e projetos diversos. Atendimento em Cotia, São Paulo e região, com trabalhos remotos para todo o Brasil.',
          locale: 'pt_BR',
          images: [
            {
              url: 'https://www.diogozura.com/logo-diogo-zura.png',
              alt: 'logo Diogo zura',
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
          content="sites, sistemas web, freelancer, telecom, desenvolvimento web, Cotia, São Paulo, desenvolvedor Cotia"
        />
        <meta name="author" content="Diogo zura" />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="Cotia" />
        <meta name="geo.position" content="-23.6034;-46.9187" />
        <meta name="ICBM" content="-23.6034, -46.9187" />
      </Head>

      {/* Global site tag (gtag.js) - Google Analytics */}
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

      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
