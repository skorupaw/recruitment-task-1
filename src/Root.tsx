import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export type RootProps = {
  type: "rest" | "graphql";
  children: React.ReactNode;
};

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function Root({ type, children }: RootProps) {
  if (type === "graphql") {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
  return (
    <>
      {children} 
    </>
  )
}
