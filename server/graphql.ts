import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { gql } from "apollo-server-express";
import controllersFactory from "./controllers";
import moodsData from "./data.json";

const delay = (time = Math.random() * 1000) =>
  new Promise((resolve) => setTimeout(resolve, time));
const controllers = controllersFactory(moodsData);

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    moods(skip: Int = 0, limit: Int, search: String): MoodsResults!
    mood(id: ID!): Mood!
  }

  type Mutation {
    saveCurrentMood(moodIds: [ID!]!): [Mood!]!
  }

  type MoodsResults {
    moods: [Mood!]!
    pagination: Pagination!
  }

  type Mood {
    id: ID!
    title: String!
    emoji: String!
    description: String!
    word: Word
  }

  type Word {
    pronunciation: String!
    definitions: [String!]!
    partOfSpeech: String!
  }

  type Pagination {
    skip: Int!
    limit: Int!
    count: Int!
  }
`;

const resolvers = {
  Query: {
    moods: (parent, args) => {
      const { skip, limit, search } = args as {
        skip: number;
        limit?: number;
        search?: string;
      };
      return delay().then(() => controllers.moods({ skip, limit, search }));
    },
    mood: (parent, args) => {
      const { id } = args as { id: string };
      return delay().then(() => controllers.mood(id));
    },
  },
  Mutation: {
    saveCurrentMood: (parent, args) => {
      const { moodIds } = args as { moodIds: string[] };
      return delay().then(() => controllers.saveCurrentMood(moodIds));
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
