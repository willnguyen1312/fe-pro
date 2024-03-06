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
import {
  gql,
  useApolloClient,
  useLazyQuery,
  ApolloError,
} from "@apollo/client";
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
  const client = useApolloClient();

  const [fetchMovie, { data, loading, error }] = useLazyQuery<{
    movies: { title: string }[];
  }>(GET_MOVIES as any, {
    fetchPolicy: "network-only",
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
          onClick={async () => {
            // fetchMovie({
            //   context: {
            //     fetchOptions: {
            //       signal: abortControllerRef.current.signal,
            //     },
            //   },
            // }).finally(() => {
            //   console.log("finally");
            //   abortControllerRef.current = new AbortController();
            // });

            try {
              await client
                .query({
                  query: GET_MOVIES,
                  fetchPolicy: "network-only",
                  context: {
                    fetchOptions: {
                      signal: abortControllerRef.current.signal,
                    },
                  },
                })
                .then((result) => {
                  console.log(result);
                })
                .finally(() => {
                  console.log("Finally");
                  abortControllerRef.current = new AbortController();
                });
            } catch (error) {
              if (error instanceof ApolloError) {
                const { networkError } = error;

                const isAbortError = networkError.name === "AbortError";

                console.log("error nha: ", networkError);
              }
            }
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
