import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

/* eslint-disable */

// http://image.mzliaoba.com/lib/antd.css
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="renderer" content="webkit" />
          <link
            href="https://cdn.bootcss.com/antd/3.5.2/antd.min.css"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${
              process.env.GA_TRACING_ID
            }`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.GA_TRACING_ID}');
              `,
            }}
          />
          {this.props.styleTags}
        </Head>
        <body id="body">
          <Main />
          <NextScript />
        </body>
        <link
          href="https://cdn.bootcss.com/mapbox-gl/0.45.0/mapbox-gl.css"
          rel="stylesheet"
        />
        {/* the ali-oss-sdk es6 import support sucks */}
        {/* import from cdn is fine, it's not my money anyway */}
        <script
          async
          src="http://gosspublic.alicdn.com/aliyun-oss-sdk-5.2.0.min.js"
        />
      </html>
    )
  }
}
