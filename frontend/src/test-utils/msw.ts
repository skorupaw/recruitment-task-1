import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const MOOD = {
  id: 1,
  title: "Happiness",
  emoji: "😄",
  description: "A state of being happy or experiencing pleasure.",
  word: {
    partOfSpeech: "Noun",
    definitions: ["The state of being happy.", "A feeling of pleasure or contentment."],
    pronunciation: "/ˈhæp.i.nəs/",
  },
};

/**
 * Example handlers
 */
const handlers = [
  http.get("/api/moods/1", () => {
    return HttpResponse.json(MOOD);
  }),
  http.get("/api/moods", () => {
    return HttpResponse.json({
      moods: [MOOD],
      pagination: { count: 1, skip: 0, limit: 3 },
    });
  }),
];

export const server = setupServer(...handlers);
export * from "msw";
