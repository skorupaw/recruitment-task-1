import { render, screen } from "@testing-library/react";
import Moods from "./Moods";
import { Mood } from "../types/common";
import { BrowserRouter } from "react-router-dom";

const DATA: Mood[] = [
  {
    id: "1",
    title: "Happiness",
    emoji: "😄",
    description: "A state of being happy or experiencing pleasure.",
    word: {
      id: "1",
      definitions: [
        "The state of being happy.",
        "A feeling of pleasure or contentment.",
      ],
      partOfSpeech: "Noun",
      pronunciation: "/ˈhæp.i.nəs/",
    },
  },
];

describe("Moods", () => {
  it("renders mood card", () => {
    render(<Moods isLoading={false} moods={DATA} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByRole("heading").textContent).toEqual(
      `${DATA[0]["title"]} ${DATA[0]["emoji"]}`,
    );
  });
});
