import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Next Js App</title>
        <meta name="description" content="메타태그 입니다" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
