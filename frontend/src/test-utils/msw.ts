import { graphql, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const MOOD = {
  id: 1,
  title: "Happiness",
  emoji: "😄",
  description: "A state of being happy or experiencing pleasure.",
  word: {
    partOfSpeech: "Noun",
    definitions: [
      "The state of being happy.",
      "A feeling of pleasure or contentment.",
    ],
    pronunciation: "/ˈhæp.i.nəs/",
  },
};

/**
 * Example handlers
 */
const handlers = [
  http.get("http://localhost:5173/api/moods/1", () => {
    return HttpResponse.json(MOOD);
  }),
  graphql.query("Mood", () => {
    return HttpResponse.json({
      data: { mood: MOOD },
    });
  }),
];

export const server = setupServer(...handlers);
export * from "msw";
