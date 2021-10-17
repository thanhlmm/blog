import { AppProps } from "next/app";

import "../styles/globals.css";

import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import "../styles.css";
import Header from "../components/header";
import Footer from "../components/footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
