import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { Form } from "./Form";
import { checkA11y } from "./utils";

describe("Form component", () => {
  it("should render a form without accessibility issue", async () => {
    const { baseElement } = render(<Form />);
    expect(await checkA11y(baseElement)).toHaveNoViolations();
  });

  describe("when user enter email and password correctly", () => {
    it("should log user in", async () => {
      const user = userEvent.setup();
      const { container } = render(<Form />);

      const usernameInput = screen.getByLabelText(/username/i);
      await user.click(usernameInput);
      await user.keyboard("username");
      const passwordInput = screen.getByLabelText(/password/i);
      await user.click(passwordInput);
      await user.keyboard("password");

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      expect(
        screen.getByRole("heading", { name: /logged in!/i }),
      ).toBeInTheDocument();

      expect(await checkA11y(container)).toHaveNoViolations();
    });
  });

  describe("when user does not enter username", () => {
    it("should show correct error message and focus on username input", async () => {
      const user = userEvent.setup();
      const { container } = render(<Form />);

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      expect(screen.getByRole("alert")).toHaveTextContent(
        /Username is required/i,
      );
      expect(screen.getByLabelText(/username/i)).toHaveFocus();

      expect(await checkA11y(container)).toHaveNoViolations();
    });
  });

  describe("when user enter username but do not enter password", () => {
    it("should show correct error message and focus on password input", async () => {
      const user = userEvent.setup();
      const { container } = render(<Form />);

      const usernameInput = screen.getByLabelText(/username/i);
      await user.click(usernameInput);
      await user.keyboard("username");

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      expect(screen.getByRole("alert")).toHaveTextContent(
        /Password is required/i,
      );
      expect(screen.getByLabelText(/password/i)).toHaveFocus();

      expect(await checkA11y(container)).toHaveNoViolations();
    });
  });

  describe("when user enter email incorrectly", () => {
    it("should show correct error message and focus on user input", async () => {
      const user = userEvent.setup();
      const { container } = render(<Form />);

      const usernameInput = screen.getByLabelText(/username/i);
      await user.click(usernameInput);
      await user.keyboard("wrong username");
      const passwordInput = screen.getByLabelText(/password/i);
      await user.click(passwordInput);
      await user.keyboard("password");

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      expect(screen.getByRole("alert")).toHaveTextContent(/Invalid username/i);
      expect(usernameInput).toHaveFocus();

      expect(await checkA11y(container)).toHaveNoViolations();
    });
  });

  describe("when user enter email incorrectly", () => {
    it("should show correct error message and focus on user input", async () => {
      const user = userEvent.setup();
      const { container } = render(<Form />);

      const usernameInput = screen.getByLabelText(/username/i);
      await user.click(usernameInput);
      await user.keyboard("username");
      const passwordInput = screen.getByLabelText(/password/i);
      await user.click(passwordInput);
      await user.keyboard("wrong password");

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      expect(screen.getByRole("alert")).toHaveTextContent(/Invalid password/i);
      expect(passwordInput).toHaveFocus();

      expect(await checkA11y(container)).toHaveNoViolations();
    });
  });

  it("should support keyboard user", async () => {
    render(<Form />);

    const user = userEvent.setup();
    await user.tab();
    expect(screen.getByLabelText(/username/i)).toHaveFocus();
    await user.keyboard("username");

    await user.tab();
    expect(screen.getByLabelText(/password/i)).toHaveFocus();
    await user.keyboard("password");

    await user.tab();
    expect(screen.getByRole("button", { name: /submit/i })).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("heading", { name: /logged in!/i }),
    ).toBeInTheDocument();
  });
});
