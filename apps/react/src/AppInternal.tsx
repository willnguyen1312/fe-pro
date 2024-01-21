import {
  Card,
  Form,
  FormLayout,
  Page,
  TextField,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import "@shopify/polaris/build/esm/styles.css";

import { useState } from "react";

const GET_MOVIES = gql`
  query ListMovies {
    movies {
      title
      id
    }
  }
`;

export function AppInternal() {
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
