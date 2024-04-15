import { Page, BlockStack, Button } from "@shopify/polaris";
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
  const [data, setData] = useState<any>(null);
  // const { data, refetch, error } = useQuery(GET_MOVIES, {
  //   // fetchPolicy: "cache-and-network",
  //   // variables: {
  //   //   name,
  //   // },
  //   onError() {
  //     // console.log(arguments);
  //   },
  // });
  const lastSubscriptionRef = useRef<any>();

  const fetchMovies = () => {
    apolloClient
      .query({
        query: GET_MOVIES,
        // fetchPolicy: "no-cache",
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        if (error instanceof ApolloError) {
          console.log({ error });
        }
      });
  };

  useEffect(() => {
    fetchMovies();
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
            fetchMovies();
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
