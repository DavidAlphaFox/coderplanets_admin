import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

/* eslint-disable */

// http://image.mzliaoba.com/lib/antd.css
export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html>
        <Head>
          <title>mastani</title>
          <link
            href="https://cdn.bootcss.com/antd/3.1.4/antd.css"
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
          {styleTags}
        </Head>
        <body id="body">
          <div className="root">{main}</div>
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
