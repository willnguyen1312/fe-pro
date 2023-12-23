import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { beforeAll, afterAll, afterEach, test, expect } from "vitest";
import Fetch from "./Fetch.vue";

const server = setupServer(
  http.get("/greeting", () => {
    return HttpResponse.json({ greeting: "hello there" });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays greeting", async () => {
  // Arrange
  const user = userEvent.setup();
  render(Fetch, {
    props: { url: "/greeting" },
  });

  // Act
  const loadGreetingButton = screen.getByRole("button", {
    name: /load greeting/i,
  });

  await user.click(loadGreetingButton);
  await screen.findByRole("heading");

  // Assert
  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toBeDisabled();
});

test("handles server error", async () => {
  server.use(
    http.get("/greeting", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  // Arrange
  const user = userEvent.setup();
  render(Fetch, {
    props: { url: "/greeting" },
  });

  // Act
  const loadGreetingButton = screen.getByRole("button", {
    name: /load greeting/i,
  });
  await user.click(loadGreetingButton);

  await screen.findByRole("alert");

  // Assert
  expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to fetch!");
  expect(screen.getByRole("button")).not.toBeDisabled();
});
