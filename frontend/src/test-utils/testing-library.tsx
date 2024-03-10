import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../Root";
import userEvent from "@testing-library/user-event";

const Providers =
  (routerEntries: string[] = []) =>
  ({ children }: { children: React.ReactNode }) => {
    return (
      <ApolloProvider client={apolloClient()}>
        <MemoryRouter initialEntries={routerEntries}>{children}</MemoryRouter>
      </ApolloProvider>
    );
  };

const customRender = (
  ui: ReactElement,
  { routes = ["/"] }: { routes?: string[] } = {},
  options?: Omit<RenderOptions, "wrapper">,
) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: Providers(routes), ...options }),
});

export * from "@testing-library/react";
export { customRender as render };
