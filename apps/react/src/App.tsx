import { AppProvider } from "@shopify/polaris";
import { ApolloProvider } from "@shopify/react-graphql";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import "@shopify/polaris/build/esm/styles.css";
import { AppInternal } from "./AppInternal";

const link = new HttpLink({
  uri: new URL("/graphql", location.href).toString(),
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider i18n={{}}>
        <AppInternal />
      </AppProvider>
    </ApolloProvider>
  );
}
