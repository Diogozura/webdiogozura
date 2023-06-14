import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import GlobalStyle from "../styles";
import {theme} from "../styles/theme";
import { ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Head>
      <link rel="canonical" href="https://diogozura.com" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}

    </Head>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SLXWF6S89G" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-SLXWF6S89G');
          `

        }}
      />

  <ThemeProvider theme={theme}>
    <GlobalStyle />
  
      <Component {...pageProps} />
    </ThemeProvider>
    </>
  )
}
