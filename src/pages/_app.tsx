import React, { useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { UniSwapContextProvider } from "../context/Context";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return (
    <UniSwapContextProvider>
      <Component {...pageProps} />
    </UniSwapContextProvider>
  );
}

export default MyApp;
