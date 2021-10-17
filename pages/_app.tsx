import { AppProps } from "next/app";
import splitbee from "@splitbee/web";
import Header from "../components/header";
import Footer from "../components/footer";

import "../styles/globals.css";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "../styles.css";

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
