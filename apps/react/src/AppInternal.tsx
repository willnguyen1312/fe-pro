import { Page, BlockStack, Button } from "@shopify/polaris";
import { gql, useQuery } from "@apollo/client";
import "@shopify/polaris/build/esm/styles.css";

import { useRef, useState } from "react";
import { client } from "./apolloClient";

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
  const { data, refetch, error } = useQuery(GET_MOVIES, {
    // fetchPolicy: "network-only",
    variables: {
      name,
    },
  });
  const lastSubscriptionRef = useRef<any>();

  console.log({ error });

  const unsubscribe = () => {
    if (lastSubscriptionRef.current) {
      lastSubscriptionRef.current.unsubscribe();
      console.log(lastSubscriptionRef.current);
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
            refetch();
            // setName("VI");
            // setName((prev) => prev + "a");
            // unsubscribe();
            // Need to wait for the next event loop to continue querying
            // setTimeout(() => {
            //   const queryInstance = client.watchQuery({
            //     query: GET_MOVIES,
            //     fetchPolicy: "network-only",
            //   });
            //   lastSubscriptionRef.current = queryInstance.subscribe(
            //     (result) => {
            //       console.log("result: ", result);
            //     }
            //   );
            // }, 0);
          }}
        >
          Load movie
        </Button>

        <h1>Movie length: {data?.movies?.length}</h1>

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
