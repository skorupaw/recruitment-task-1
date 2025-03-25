import { render, screen } from "@/test-utils/testing-library";
import App from "@/App";
import { describe, expect, test } from "vitest";

describe("App", () => {
  test("search input is focused", async () => {
    render(<App />);

    expect(await screen.findByPlaceholderText(/Search/i)).toHaveFocus();
  });

  test.todo('prevents user from selecting more than 3 "mood cards"');
});
