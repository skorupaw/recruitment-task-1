import { render, screen } from "@/test-utils/testing-library";
import { server, http, HttpResponse } from "@/test-utils/msw";
import { MoodsProvider } from "@/lib/moods-context";
import App from "@/App";
import { describe, expect, test } from "vitest";

const MOODS = [
  {
    id: "1",
    title: "Happiness",
    emoji: "😄",
    description: "Happy.",
    word: {
      partOfSpeech: "Noun",
      definitions: ["Happy."],
      pronunciation: "/h/",
    },
  },
  {
    id: "2",
    title: "Sadness",
    emoji: "😢",
    description: "Sad.",
    word: { partOfSpeech: "Noun", definitions: ["Sad."], pronunciation: "/s/" },
  },
  {
    id: "3",
    title: "Anger",
    emoji: "😠",
    description: "Angry.",
    word: {
      partOfSpeech: "Noun",
      definitions: ["Angry."],
      pronunciation: "/a/",
    },
  },
  {
    id: "4",
    title: "Fear",
    emoji: "😨",
    description: "Fear.",
    word: {
      partOfSpeech: "Noun",
      definitions: ["Fear."],
      pronunciation: "/f/",
    },
  },
];

describe("App", () => {
  test("search input is focused", async () => {
    render(
      <MoodsProvider>
        <App />
      </MoodsProvider>,
    );

    expect(await screen.findByPlaceholderText(/Search/i)).toHaveFocus();
  });

  test('prevents user from selecting more than 3 "mood cards"', async () => {
    server.use(
      http.get("/api/moods", () => {
        return HttpResponse.json({
          moods: MOODS,
          pagination: { count: 4, skip: 0, limit: 4 },
        });
      }),
    );

    const { user } = render(
      <MoodsProvider>
        <App />
      </MoodsProvider>,
    );

    const happiness = await screen.findByTestId("mood-card-Happiness");
    const sadness = await screen.findByTestId("mood-card-Sadness");
    const anger = await screen.findByTestId("mood-card-Anger");
    const fear = await screen.findByTestId("mood-card-Fear");

    await user.click(happiness);
    await user.click(sadness);
    await user.click(anger);
    await user.click(fear);

    expect(
      await screen.findByText("You can only select up to 3 moods"),
    ).toBeInTheDocument();
  });
});
