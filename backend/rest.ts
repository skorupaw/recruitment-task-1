import "@bogeychan/elysia-polyfills/node/index.js";

import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import controllersFactory from "./controllers";
import moodsData from "./data.json" assert { type: "json" };

const delay = (time = Math.random() * 5000) =>
  new Promise((resolve) => setTimeout(resolve, time));
const controllers = controllersFactory(moodsData);

const app = new Elysia()
  .use(cors())
  .get("/", ({ set }) => (set.redirect = "/api/moods"))
  .get(
    "/api/moods",
    ({ query }) => {
      const { skip = 0, limit, search } = query;
      return delay().then(() =>
        controllers.moods({ skip: Number(skip), limit: Number(limit), search }),
      );
    },
    {
      query: t.Object({
        skip: t.Optional(t.Numeric()),
        limit: t.Optional(t.Numeric()),
        search: t.Optional(t.String()),
      }),
    },
  )
  .get(
    "/api/moods/:id",
    ({ params, set }) => {
      const { id } = params;
      const mood = controllers.mood(id);
      if (mood) {
        return delay().then(() => mood);
      }
      set.status = 404;
      return "NOT_FOUND";
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post(
    "/api/moods/current",
    ({ body, set }) => {
      const { moodIds } = body;
      const moods = controllers.saveCurrentMood(moodIds);
      set.status = 201;
      return delay().then(() => moods);
    },
    { body: t.Object({ moodIds: t.Array(t.String()) }) },
  )
  .listen(4000);

console.log(
  `🦊 Elysia server is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
