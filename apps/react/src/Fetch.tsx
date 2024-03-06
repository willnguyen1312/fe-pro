import React from "react";
import ExpensiveComp from "./ExpensiveComp";

export const Fetch = (props: { url?: string }) => {
  const [greeting, setGreeting] = React.useState("");
  const [error, setError] = React.useState("");
  const abortControllerRef = React.useRef(new AbortController());

  async function loadGreeting() {
    try {
      const response = await fetch(
        new URL(props.url ?? "/api/hello", location.href),
        {
          signal: abortControllerRef.current.signal,
        }
      );
      const data = await response.json();
      setGreeting(data.greeting);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted", error);
        return;
      }
      setError("Oops, failed to fetch!");
    }
  }

  return (
    <div>
      <button disabled={!!greeting} onClick={loadGreeting}>
        Load Greeting
      </button>
      <button
        onClick={() => {
          abortControllerRef.current.abort();
          abortControllerRef.current = new AbortController();
        }}
      >
        Cancel Loading
      </button>
      {greeting ? <h1>{greeting}</h1> : null}
      {error ? <h1 role="alert">{error}</h1> : null}

      <ExpensiveComp />
    </div>
  );
};

export default Fetch;
