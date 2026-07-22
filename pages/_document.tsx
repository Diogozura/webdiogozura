// pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): React.ReactElement {
    return (
      <Html lang="pt-BR">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{
                var mode = localStorage.getItem('dz-theme-mode');
                if(!mode){ mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
                var accent = localStorage.getItem('dz-theme-accent') || 'padrao';
                document.documentElement.setAttribute('data-theme', mode);
                document.documentElement.setAttribute('data-accent', accent);
              }catch(e){}})();`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
