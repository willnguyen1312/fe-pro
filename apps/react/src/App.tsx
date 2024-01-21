import {
  AppProvider,
  Card,
  Form,
  FormLayout,
  Page,
  TextField,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { ApolloProvider, useQuery } from "@shopify/react-graphql";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { useState } from "react";

const link = new HttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const GET_MOVIES = gql`
  query ListMovies {
    movies {
      title
      id
    }
  }
`;

function Internal() {
  const [name, setName] = useState("Nam");
  const { data, loading, error } = useQuery<{
    movies: { title: string }[];
  }>(GET_MOVIES as any, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <Page title="Add Product">
      <BlockStack gap="400">
        <Card>
          <Form
            onSubmit={() => {
              console.log("submitted");
            }}
          >
            <FormLayout>
              <TextField
                value={name}
                onChange={(value) => {
                  setName(value);
                }}
                label="Name"
                type="text"
                autoComplete="off"
              />
            </FormLayout>
          </Form>
        </Card>

        <Card>
          {loading && <Text as="p">Loading...</Text>}
          {error && <Text as="p">{error.message}</Text>}
          {data?.movies.map((movie) => (
            <Text as="p" key={movie.title}>
              {movie.title}
            </Text>
          ))}
        </Card>
      </BlockStack>
    </Page>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider i18n={enTranslations}>
        <Internal />
      </AppProvider>
    </ApolloProvider>
  );
}
