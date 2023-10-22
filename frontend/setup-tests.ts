import "vitest-dom/extend-expect";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://localhost:5173/api/moods/1", (req, res, ctx) => {
    return res(
      ctx.json({
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
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
