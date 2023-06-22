import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import moodsData from "../data/data.json";

const app = express();

app.use("/", cors<cors.CorsRequest>(), bodyParser.json());

type RequestBody<T> = Request<Record<string, never>, Record<string, never>, T>;
type RequestQuery<T> = Request<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  T
>;

type Mood = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

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

    const data = search
      ? moodsData.filter((mood) =>
          mood.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : moodsData;

    const moods =
      limit !== undefined && limit >= 0
        ? data.slice(skip, limit)
        : data.slice(skip);

    res.json({
      moods,
      pagination: { skip, limit: limit ?? 0, count: moodsData.length },
    });
    return;
  }
);

app.post("/api/moods/current", (req: RequestBody<Mood[]>, res: Response) => {
  const moods = req.body;
  res.status(201).json(moods);
});

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000/`);
});
