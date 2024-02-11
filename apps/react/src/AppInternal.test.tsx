import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { PolarisTestProvider } from "@shopify/polaris";
import { describe, expect } from "vitest";

import { AppInternal } from "./AppInternal";

const link = new HttpLink({
  uri: location.href,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ApolloProvider client={client}>
      <PolarisTestProvider>{ui}</PolarisTestProvider>
    </ApolloProvider>,
  );
}

describe("App", () => {
  it("should render", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppInternal />);

    expect(await screen.findByText(/Movie 1/i)).toBeInTheDocument();

    const nameInput = screen.getByRole("textbox", { name: /name/i });

    await act(() => user.clear(nameInput));

    const inputValue = "Nam Nguyen";

    await act(() => user.type(nameInput, inputValue));

    expect(screen.getByDisplayValue(inputValue)).toBeInTheDocument();
  });
});
