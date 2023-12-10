import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import WalletContextProvider from "../Data/WalletContextProvider";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
