import { render, screen } from "./test-utils/testing-library";
import App from "./App";

describe("App", () => {
  it("focuses the search input", async () => {
    render(<App />);

    expect(await screen.findByPlaceholderText(/Search/i)).toHaveFocus();
  });
  it.todo('prevents user from selecting more then 3 "mood cards"');
});
