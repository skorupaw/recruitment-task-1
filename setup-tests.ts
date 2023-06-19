import '@testing-library/jest-dom'
import 'whatwg-fetch'

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://localhost:4000/api/moods", (req, res, ctx) => {
    return res(
      ctx.json({
        moods: [
          {
            id: "1a2b3c",
            emoji: "😊",
            title: "Happy",
            description: "Feeling joyful, content, or delighted.",
          },
        ],
        pagination: { skip: 0, limit: 0, count: 1 },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
