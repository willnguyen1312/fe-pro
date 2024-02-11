import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { server } from "./mocks/node";

import { expect, test, vi } from "vitest";
import { Fetch } from "./Fetch";

beforeEach(() => {
  server.use(
    http.get("/greeting", () => {
      return HttpResponse.json({ greeting: "hello there" });
    }),
  );
});

vi.mock("./ExpensiveComp", () => ({
  default: () => <span>Mocked ExpensiveComp</span>,
}));

test("ignore expensive component", async () => {
  render(<Fetch url="/greeting" />);

  expect(screen.getByText("Mocked ExpensiveComp")).toBeInTheDocument();
});

test("loads and displays greeting", async () => {
  // Arrange
  const user = userEvent.setup();
  render(<Fetch url="/greeting" />);

  // Act
  const loadGreetingButton = screen.getByRole("button", {
    name: /load greeting/i,
  });

  await act(() => user.click(loadGreetingButton));
  await screen.findByRole("heading");

  // Assert
  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toBeDisabled();
});

test("handles server error", async () => {
  server.use(
    http.get("/greeting", () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  // Arrange
  const user = userEvent.setup();
  render(<Fetch url="/greeting" />);

  // Act
  const loadGreetingButton = screen.getByRole("button", {
    name: /load greeting/i,
  });

  await act(() => user.click(loadGreetingButton));

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
    </div>,
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
