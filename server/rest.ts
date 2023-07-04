import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import moodsData from "./data.json";
import controllersFactory from "./controllers";

type RequestBody<T> = Request<Record<string, never>, Record<string, never>, T>;
type RequestParams<T> = Request<T>;
type RequestQuery<T> = Request<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  T
>;

const delay = (time = Math.random() * 5000) =>
  new Promise((resolve) => setTimeout(resolve, time));
const controllers = controllersFactory(moodsData);

const app = express();

app.use("/", cors<cors.CorsRequest>(), bodyParser.json());

app.get("/", (req, res) => {
  res.redirect("/api/moods");
});

app.get(
  "/api/moods",
  (
    req: RequestQuery<{ skip: number; search?: string; limit?: number }>,
    res: Response
  ) => {
    const { skip, limit, search } = req.query;
    return delay().then(() =>
      res.json(controllers.moods({ skip, limit, search }))
    );
  }
);

app.get(
  "/api/moods/:id",
  (req: RequestParams<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const mood = controllers.mood(id);
    if (mood) {
      return delay().then(() => res.json(mood));
    }
    return res.sendStatus(404);
  }
);

app.post(
  "/api/moods/current",
  (req: RequestBody<{ moodIds: string[] }>, res: Response) => {
    const { moodIds } = req.body;
    const moods = controllers.saveCurrentMood(moodIds);
    return delay().then(() => res.status(201).json(moods));
  }
);

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000/`);
});
