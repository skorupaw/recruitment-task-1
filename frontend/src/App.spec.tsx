import { render, screen } from "@/test-utils/testing-library";
import App from "@/App";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("focuses the search input", async () => {
    render(<App />);

    expect(await screen.findByPlaceholderText(/Search/i)).toHaveFocus();
  });

  it.todo('prevents user from selecting more than 3 "mood cards"');
});
