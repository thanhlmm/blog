import Head from "next/head";
import { AppProps } from "next/app";
import splitbee from "@splitbee/web";
import Header from "../components/header";
import Footer from "../components/footer";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.css";

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>ThanhLe Blog - Homepage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.png"></link>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default appWithTranslation(App);
