import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { expect } from "vitest";

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" placeholder="email" />
      <img
        src="https://example.com"
        // alt="example"
      />
    </form>
  );
}

test("accessible forms pass axe", async () => {
  const { container } = render(<AccessibleForm />);
  expect(await axe(container)).not.toHaveNoViolations();
});
