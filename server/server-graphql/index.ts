import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { gql } from "apollo-server-express";
import moodsData from "../data/data.json";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getMoods(skip: Int = 0, limit: Int, search: String): GetMoodsResults!
  }

  type GetMoodsResults {
    moods: [Mood!]!
    pagination: Pagination!
  }

  type Mutation {
    saveCurrentMood(moodIds: [ID!]!): [Mood!]!
  }

  type Mood {
    id: ID!
    emoji: String!
    title: String!
    description: String!
  }

  type Pagination {
    skip: Int!
    limit: Int!
    count: Int!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getMoods: (parent, args) => {
      const { skip, limit, search } = args as {
        skip: number;
        limit?: number;
        search?: string;
      };

      const data = search
        ? moodsData.filter((mood) =>
            mood.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        : moodsData;

      const moods =
        limit !== undefined && limit >= 0
          ? data.slice(skip, limit)
          : data.slice(skip);

      return {
        moods,
        pagination: { skip, limit: limit ?? 0, count: moodsData.length },
      };
    },
  },
  Mutation: {
    saveCurrentMood: (parent, args) => {
      const { moodIds } = args as { moodIds: string[] };
      return moodIds
        .map((id) => moodsData.find((mood) => mood.id === id))
        .filter(Boolean);
    },
  },
};

(async function () {
  // Required logic for integrating with Express
  const app = express();

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<Record<string, never>>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
})().catch((error) => {
  console.log(error);
  process.exit(1);
});
