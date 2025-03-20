import { Hono } from "hono";
import moodsData from "../data.json" with { type: "json" };
import controllersFactory from "./controllers.js";
import delay from "../lib/delay.js";

const rest = new Hono();

const controllers = controllersFactory(moodsData);

rest
  .get("/", (c) => c.redirect("/api/moods"))
  .get("/api/moods", (c) => {
    const query = c.req.query();
    const { skip = 0, limit, search } = query;
    return delay()
      .then(() =>
        controllers.moods({ skip: Number(skip), limit: Number(limit), search }),
      )
      .then((result) => c.json(result));
  })
  .get("/api/moods/:id", (c) => {
    const { id } = c.req.param();
    const mood = controllers.mood(id);
    if (mood) {
      return delay().then(() => c.json(mood));
    }
    c.status(404);
    return Promise.resolve(c.text("NOT_FOUND"));
  })
  .post("/api/moods/current", async (c) => {
    const { moodIds = [] } = await c.req.json<{ moodIds: string[] }>();
    const moods = controllers.saveCurrentMood(moodIds);
    c.status(201);
    return delay().then(() => c.json(moods));
  });

export default rest;
