import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router";
import Mood from "./components/Mood";
import { useMemo } from "react";
import { Toaster } from "@/ui";

export const apolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:5173/graphql",
    cache: new InMemoryCache(),
  });
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/mood/:moodId",
        element: <Mood />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
const client = apolloClient();

export function Root() {
  return useMemo(
    () => (
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <Toaster />
      </ApolloProvider>
    ),
    [],
  );
}

export default Root;
