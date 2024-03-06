import {
  Card,
  Form,
  FormLayout,
  Page,
  TextField,
  Text,
  BlockStack,
  Button,
} from "@shopify/polaris";
import { useQuery } from "@shopify/react-graphql";
import { gql, useLazyQuery } from "@apollo/client";
import "@shopify/polaris/build/esm/styles.css";

import { useRef, useState } from "react";

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
  const abortControllerRef = useRef(new AbortController());

  const [fetchMovie, { data, loading, error }] = useLazyQuery<{
    movies: { title: string }[];
  }>(GET_MOVIES as any, {
    fetchPolicy: "cache-and-network",
    skipPollAttempt: () => true,
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

        <Button
          onClick={() => {
            fetchMovie({
              context: {
                fetchOptions: {
                  signal: abortControllerRef.current.signal,
                },
              },
            }).finally(() => {
              console.log("finally");
              abortControllerRef.current = new AbortController();
            });
          }}
        >
          Load movie
        </Button>

        <Button
          onClick={() => {
            abortControllerRef.current.abort();
          }}
        >
          Cancel
        </Button>

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
