import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
 return (
  <Html>
   <Head>
    <link
     href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
     rel='stylesheet'
    />
   </Head>
   <body>
    <Main />
    <NextScript />
   </body>
  </Html>
 );
}
