import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { beforeAll, afterAll, afterEach, test, expect } from "vitest";
import { Fetch } from "./Fetch";

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
  render(<Fetch url="/greeting" />);

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
  render(<Fetch url="/greeting" />);

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

test("accessibility", async () => {
  const user = userEvent.setup();
  render(
    <div>
      <input type="checkbox" />
      <input type="radio" />
      <input type="number" />
    </div>
  );

  const checkbox = screen.getByRole("checkbox");
  const radio = screen.getByRole("radio");
  const number = screen.getByRole("spinbutton");

  expect(document.body).toHaveFocus();

  await user.tab();

  expect(checkbox).toHaveFocus();

  await user.tab();

  expect(radio).toHaveFocus();

  await user.tab();

  expect(number).toHaveFocus();

  await user.tab();

  // cycle goes back to the body element
  expect(document.body).toHaveFocus();

  await user.tab();

  expect(checkbox).toHaveFocus();
});
