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

let count = 0;

export function AppInternal() {
  const [name, setName] = useState("Nam");
  const lastSubscriptionRef = useRef<any>();
  const client = useApolloClient();

  const [fetchMovie, { data, loading, error }] = useLazyQuery<{
    movies: { title: string }[];
  }>(GET_MOVIES as any, {
    fetchPolicy: "network-only",
    skipPollAttempt: () => true,
  });

  const unsubscribe = () => {
    if (lastSubscriptionRef.current) {
      lastSubscriptionRef.current.unsubscribe();
    }
  };

  return (
    <Page title="Cinema 🎥">
      <BlockStack gap="400">
        {/* <Card>
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
        </Card> */}

        <Button
          onClick={() => {
            // unsubscribe();

            // Need to wait for the next event loop to continue querying
            setTimeout(() => {
              const queryInstance = client.watchQuery({
                query: GET_MOVIES,
                variables: { count: count++ },
                fetchPolicy: "network-only",
              });

              lastSubscriptionRef.current = queryInstance.subscribe(
                (result) => {
                  console.log("result: ", result);
                }
              );
            }, 0);
          }}
        >
          Load movie
        </Button>

        <Button onClick={unsubscribe}>Cancel</Button>

        {/* <Card>
          {loading && <Text as="p">Loading...</Text>}
          {error && <Text as="p">{error.message}</Text>}
          {data?.movies.map((movie) => (
            <Text as="p" key={movie.title}>
              {movie.title}
            </Text>
          ))}
        </Card> */}
      </BlockStack>
    </Page>
  );
}
