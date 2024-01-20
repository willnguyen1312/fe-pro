import React from "react";
import ExpensiveComp from "./ExpensiveComp";

export const Fetch = (props: { url: string }) => {
  const [greeting, setGreeting] = React.useState("");
  const [error, setError] = React.useState("");

  async function loadGreeting() {
    try {
      const response = await fetch(new URL(props.url, location.href));
      const data = await response.json();
      setGreeting(data.greeting);
    } catch (error) {
      setError("Oops, failed to fetch!");
    }
  }

  return (
    <div>
      <button disabled={!!greeting} onClick={loadGreeting}>
        Load Greeting
      </button>
      {greeting ? <h1>{greeting}</h1> : null}
      {error ? <h1 role="alert">{error}</h1> : null}

      <ExpensiveComp />
    </div>
  );
};
