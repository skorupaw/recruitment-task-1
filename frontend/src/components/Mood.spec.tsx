import { Route, Routes } from "react-router";
import { render, screen } from "@/test-utils/testing-library";
import { describe, expect, test } from "vitest";
import { server } from "@/test-utils/msw";
import { delay, http, HttpResponse } from "msw";
import Mood from "./Mood";

describe("Mood", () => {
  test("Renders skeleton loader while loading", async () => {
    server.use(
      http.get("/api/moods/1", async () => {
        await delay(100);
        return HttpResponse.json({
          id: "1",
          title: "Happiness",
          emoji: "😄",
        });
      }),
    );

    setup();
    expect(screen.getByRole("loading")).toBeInTheDocument();
  });

  test("Renders mood details after loading", async () => {
    setup();
    expect(await screen.findByText("Happiness")).toBeInTheDocument();
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
  });

  test("Renders skeleton when fetch fails", async () => {
    server.use(
      http.get("/api/moods/1", () => {
        return HttpResponse.json({ message: "Server error" }, { status: 500 });
      }),
    );

    setup();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(screen.getByRole("loading")).toBeInTheDocument();
    expect(screen.queryByText("Happiness")).not.toBeInTheDocument();
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
