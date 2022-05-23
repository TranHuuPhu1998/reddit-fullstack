import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { appWithTranslation } from "next-i18next";

const client = new ApolloClient({
  uri: "http://localhost:5555/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <DarkModeSwitch />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default appWithTranslation(MyApp);
