import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>serverless function on vercel</title>
        <meta
          name="viewport"
          content="multiple serverless function on vercel"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Estimate Pi with Monte Carlo Method"
        />
        <meta property="og:description" content="" />
        <meta property="og:image" content="/snaphot/2023-8-5.png" />
        <meta name="twitter:card" content="/snaphot/2023-8-5.png" />
        <meta name="twitter:site" content="" />
        <meta
          name="twitter:title"
          content="Estimate Pi with Monte Carlo Method"
        />
        <meta name="twitter:description" content="" />
        <meta name="twitter:creator" content="" />
        <meta property="og:url" content="" />
        <meta name="twitter:image" content="/snaphot/2023-8-5.png" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
