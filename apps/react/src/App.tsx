import { AppProvider } from "@shopify/polaris";
import { ApolloProvider } from "@shopify/react-graphql";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import "@shopify/polaris/build/esm/styles.css";
import { AppInternal } from "./AppInternal";
import { client } from "./apolloClient";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider i18n={{}}>
        <AppInternal />
      </AppProvider>
    </ApolloProvider>
  );
}
