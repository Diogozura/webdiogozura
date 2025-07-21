import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'


import { NextSeo, SocialProfileJsonLd } from 'next-seo';
import theme from '@/styles/theme';
import { globalStyles } from '@/styles';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
         <SocialProfileJsonLd
        type="Person"
        name="Diogo zura"
        url="https://www.diogozura.com"
        sameAs={[
          'https://www.instagram.com/diogozura_/',
        ]}
     
      />
     <NextSeo
                additionalMetaTags={[{
                    property: 'Front-end',
                    content: 'Diogo Zura',
                   
                }, 
                ]}

    
                openGraph={{
                  type: 'website',
                  url: 'https://www.diogozura.com',
                  title: 'Diogo zura',
                  description: 'hi im diogo para , front end developer and UX/UI design , always focused on improving peoples lives with technology ',
                  images: [
                      {
                          url: 'https://diogozura.com/DiogoZura.png',
                          alt: 'logo Diogo zura',
                      },
                  ],
              }}
            />
     
      <Head>
        <link rel="canonical" href="https://www.diogozura.com" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="hi i'm diogo para , front end developer and UX/UI design , always focused on improving people's lives with technology "/>
        <meta name="keywords" content="HTML, CSS, Next.js, Portilfio , Website"/>
        <meta name="author" content="Diogo zura"/>
        <title> Diogo zura Front end Developer / UX UI </title>
              {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}

            </Head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4G27WSXMW2" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
           window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-4G27WSXMW2');
          `

              }}
      />

            
             {globalStyles}

              <Component {...pageProps} />
          </>
          )
}
