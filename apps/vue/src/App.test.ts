import { render, screen } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";
import App from "./App.vue";
import { test } from "vitest";

test("increments value on click", async () => {
  // Arrange
  const user = userEvent.setup();
  render(App);

  // Act
  screen.getByText("Times clicked: 0");
  const button = screen.getByText("increment");

  await user.click(button);
  await user.click(button);

  // Assert
  screen.getByText("Times clicked: 2");
});
