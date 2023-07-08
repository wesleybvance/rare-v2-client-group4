import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class RareDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Belanosima&family=Gloock&family=Oranienbaum&family=Prata&family=Shippori+Mincho&family=Staatliches&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RareDocument;
