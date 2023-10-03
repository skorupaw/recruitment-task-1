import "@bogeychan/elysia-polyfills/node/index.js";

import { Elysia } from "elysia";
import { apollo, gql } from "@elysiajs/apollo";
import controllersFactory from "./controllers";
import moodsData from "./data.json";

const delay = (time = Math.random() * 1000) =>
  new Promise((resolve) => setTimeout(resolve, time));
const controllers = controllersFactory(moodsData);

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
    moods: (
      parent: unknown,
      args: { skip?: number; limit?: number; search: string },
    ) => {
      const { skip = 0, limit = 3, search } = args;
      return delay().then(() => controllers.moods({ skip, limit, search }));
    },
    mood: (parent: unknown, args: { id: string }) => {
      const { id } = args as { id: string };
      return delay().then(() => controllers.mood(id));
    },
  },
  Mutation: {
    saveCurrentMood: (parent: unknown, args: { moodIds: string[] }) => {
      const { moodIds } = args;
      return delay().then(() => controllers.saveCurrentMood(moodIds));
    },
  },
};

const app = new Elysia()
  .use(
    apollo({
      typeDefs,
      resolvers,
    }),
  )
  .listen(4000);

console.log(
  `🦊 Elysia server is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
