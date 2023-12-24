import { useState } from "react";

async function getMessageFromServer(name: string) {
  const response = await fetch(new URL("/api/hello", location.href), {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let error = "";
  let message = "";

  if (!response.ok) {
    const result = await response.json();
    error = result.message;
  } else {
    const result = await response.json();
    message = result.message;
  }

  return {
    error,
    message,
  };
}

export const Hi = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const name = data.get("name");

    setError("");
    setResult("");
    setIsSubmitting(true);

    const response = await getMessageFromServer(name as string);

    setError(response.error);
    setResult(response.message);
    setIsSubmitting(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Your name
          <input id="name" name="name" type="text" placeholder="" />
        </label>

        <button>Submit</button>
      </form>

      {isSubmitting && <p role="alert">Submitting...</p>}
      {result && <p role="alert">{result}</p>}
      {error && <p role="alert">{error}</p>}
    </>
  );
};
