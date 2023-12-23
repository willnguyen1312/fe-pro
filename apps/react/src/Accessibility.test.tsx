import { render } from "@testing-library/react";
import { expect } from "vitest";
import { checkA11y } from "./utils";

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" placeholder="email" />
      <img src="https://example.com" alt="example" />
    </form>
  );
}

test("accessible forms pass axe", async () => {
  const { container } = render(<AccessibleForm />);
  expect(await checkA11y(container)).toHaveNoViolations();
});
