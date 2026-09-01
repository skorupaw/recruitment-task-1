import { Hono } from "hono";
import moodsData from "../data.json" with { type: "json" };
import controllersFactory from "./controllers.js";
import delay from "../lib/delay.js";

const rest = new Hono();

const controllers = controllersFactory(moodsData);

rest
  .get("/", (c) => c.redirect("/api/moods"))
  .get("/api/moods", async (c) => {
    const query = c.req.query();
    const { skip = 0, limit, search } = query;
    await delay();
    const result = controllers.moods({
      skip: Number(skip),
      limit: Number(limit),
      search,
    });
    return c.json(result);
  })
  .get("/api/moods/:id", async (c) => {
    const { id } = c.req.param();
    const mood = controllers.mood(id);
    if (!mood) {
      return c.text("NOT_FOUND", 404);
    }
    await delay();
    return c.json(mood);
  })
  .post("/api/moods/current", async (c) => {
    const { moodIds = [] } = await c.req.json<{ moodIds: string[] }>();
    const moods = controllers.saveCurrentMood(moodIds);
    await delay();
    return c.json(moods, 201);
  });

export default rest;
