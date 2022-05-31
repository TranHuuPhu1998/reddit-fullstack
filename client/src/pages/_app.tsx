import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import theme from "../theme";
import { AppProps } from "next/app";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from "next-i18next";
import { useApollo } from "../lib/apolloClient";
import SEO from "../../next-seo.config";
import React from "react";
const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <DarkModeSwitch />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default appWithTranslation(MyApp);
