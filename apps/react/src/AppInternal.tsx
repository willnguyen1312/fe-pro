import { Page, BlockStack, Button, Card, Text } from "@shopify/polaris";
import { gql, useQuery, useApolloClient, ApolloError } from "@apollo/client";
import "@shopify/polaris/build/esm/styles.css";

import { useEffect, useRef, useState } from "react";
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
  const apolloClient = useApolloClient();
  // const [data, setData] = useState<any>(null);
  const { data, refetch, error, loading } = useQuery(GET_MOVIES, {
    // fetchPolicy: "no-cache",
    // variables: {
    //   name,
    // },
    // onError() {
    // console.log(arguments);
    // },
  });
  console.log({ loading });

  const lastSubscriptionRef = useRef<any>();

  // const fetchMovies = () => {
  //   apolloClient
  //     .query({
  //       query: GET_MOVIES,
  //       errorPolicy: "all",
  //       // fetchPolicy: "no-cache",
  //     })
  //     .then((result) => {
  //       debugger;
  //       setData(result.data);
  //     })
  //     .catch((error) => {
  //       if (error instanceof ApolloError) {
  //         console.log({ error });
  //       }
  //     });
  // };

  useEffect(() => {
    // fetchMovies();

    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  const unsubscribe = () => {
    if (lastSubscriptionRef.current) {
      lastSubscriptionRef.current.unsubscribe();
      console.log(lastSubscriptionRef.current);
    }
  };

  return (
    <Page title="Cinema 🎥">
      <BlockStack gap="400">
        <Button
          onClick={() => {
            refetch();
          }}
        >
          Load movie
        </Button>

        <h1>Movie length: {data?.movies?.length}</h1>

        <Button onClick={unsubscribe}>Cancel</Button>

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
