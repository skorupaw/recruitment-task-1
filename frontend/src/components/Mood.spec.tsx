import { Route, Routes } from "react-router-dom";
import { render, screen } from "../test-utils/testing-library";
import Mood from "./Mood";

describe("Mood", () => {
  test("mood details are being rendered", async () => {
    setup();

    expect(
      await screen.findByRole("heading", { name: /Happiness/ }),
    ).toBeInTheDocument();
  });
});

const setup = () =>
  render(
    <Routes>
      <Route path="/" element={<Empty />} />
      <Route path="/mood/:moodId" element={<Mood />} />
    </Routes>,
    { routes: ["/mood/1"] },
  );

const Empty = () => <div />;
