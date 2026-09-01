import { render, screen } from "@/test-utils/testing-library";
import { MoodsProvider } from "@/lib/moods-context";
import Moods from "./Moods";
import { describe, expect, test } from "vitest";

describe("Moods", () => {
  test("renders list of mood cards", async () => {
    render(
      <MoodsProvider>
        <Moods />
      </MoodsProvider>,
    );

    expect(await screen.findByText("Happiness")).toBeInTheDocument();
  });
});
