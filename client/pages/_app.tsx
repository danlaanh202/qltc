import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
