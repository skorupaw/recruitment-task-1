import { Hono } from "hono";
import moodsData from "../data.json" with { type: "json" };
import controllersFactory from "./controllers.js";
import { graphqlServer, type RootResolver } from "@hono/graphql-server";
import { buildSchema } from "graphql";
import delay from "../lib/delay.js";

const graphql = new Hono();

const controllers = controllersFactory(moodsData);

const schema = buildSchema(`
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
`);

const rootResolver: RootResolver = () => {
  return {
    moods: (args: { skip?: number; limit?: number; search: string }) => {
      const { skip = 0, limit, search } = args;
      return delay().then(() => controllers.moods({ skip, limit, search }));
    },
    mood: (args: { id: string }) => {
      const { id } = args as { id: string };
      return delay().then(() => controllers.mood(id));
    },
    saveCurrentMood: (args: { moodIds: string[] }) => {
      const { moodIds } = args;
      console.log("moodIds", moodIds);
      return delay().then(() => controllers.saveCurrentMood(moodIds));
    },
  };
};

graphql.use(
  "/graphql",
  graphqlServer({
    schema,
    rootResolver,
    graphiql: true,
  }),
);

export default graphql;
