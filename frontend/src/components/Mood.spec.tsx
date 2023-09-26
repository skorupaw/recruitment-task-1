import { render, screen } from "@testing-library/react";
import Mood from "./Mood";
import { BrowserRouter } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useParams: () => ({ moodId: 1 }),
  };
});

describe("Mood", () => {
  it("renders mood details", async () => {
    render(<Mood />, { wrapper: BrowserRouter });

    expect(
      await screen.findByRole("heading", { name: /Happiness/ }),
    ).toBeInTheDocument();
  });
});
