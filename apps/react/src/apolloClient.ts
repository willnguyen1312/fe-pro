import { AppProvider } from "@shopify/polaris";
import { ApolloProvider } from "@shopify/react-graphql";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import "@shopify/polaris/build/esm/styles.css";
import { AppInternal } from "./AppInternal";

const link = new HttpLink({
  uri: new URL("/graphql", location.href).toString(),
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
