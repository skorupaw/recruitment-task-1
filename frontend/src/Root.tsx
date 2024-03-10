import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Mood from "./components/Mood";

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

export default function Root() {
  return (
    <ApolloProvider client={apolloClient()}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ApolloProvider>
  );
}
