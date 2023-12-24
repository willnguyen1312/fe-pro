import { useState } from "react";

export const Form = () => {
  const [error, setError] = useState("");
  const [login, setLogin] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const username = data.get("username");
    const password = data.get("password");

    if (username === "username" && password === "password") {
      setLogin(true);
    } else if (!username) {
      setError("Username is required");
      //   Focus on username input
      document.getElementById("username")?.focus();
    } else if (!password) {
      setError("Password is required");
      //   Focus on username input
      document.getElementById("password")?.focus();
    } else if (username !== "username") {
      setError("Invalid username");
      //   Focus on username input
      document.getElementById("username")?.focus();
    } else if (password !== "password") {
      setError("Invalid password");
      //   Focus on password input
      document.getElementById("password")?.focus();
    }
  }

  if (login) {
    return <h1>Logged in!</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username
        <input id="username" name="username" placeholder="username" />
      </label>

      <label htmlFor="password">
        Password
        <input id="password" name="password" type="password" />
      </label>

      <button>Submit</button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
};
