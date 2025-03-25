import { describe, expect, test, vi } from "vitest";
import { Moods, MoodsProps } from "./Moods"; // Dostosuj ścieżkę
import { Mood } from "@/api-types/common";
import { Route, Routes } from "react-router";
import { render, screen, fireEvent } from "@/test-utils/testing-library";

const mockMoods: Mood[] = [
  {
    id: "1",
    title: "Happiness",
    emoji: "😄",
    description: "A state of being happy or experiencing pleasure.",
    word: {
      id: "1",
      partOfSpeech: "Noun",
      definitions: [
        "The state of being happy.",
        "A feeling of pleasure or contentment.",
      ],
      pronunciation: "/ˈhæp.i.nəs/",
    },
  },
];

const setup = (props: Partial<MoodsProps> = {}) => {
  const defaultProps: MoodsProps = {
    data: mockMoods,
    loading: false,
    selectedMoods: [],
    setSelectedMoods: vi.fn(),
  };

  return render(
    <Routes>
      <Route path="/" element={<Moods {...defaultProps} {...props} />} />
    </Routes>,
    { routes: ["/"] },
  );
};

describe("Moods Component", () => {
  test("Renders MoodCardsLoaders when loading is true", () => {
    setup({ loading: true });

    expect(screen.getAllByRole("loading")).toHaveLength(3);
    expect(screen.queryByText("Happiness")).not.toBeInTheDocument();
  });

  test("Renders MoodCardsLoaders when data is undefined", () => {
    setup({ data: undefined, loading: false });
    expect(screen.getAllByRole("loading")).toHaveLength(3);
  });

  test("Renders MoodCards with data when loading is false", () => {
    setup({ selectedMoods: ["1"] });
    expect(screen.getByText("Happiness")).toBeInTheDocument();
  });

  test("Adds a mood to selectedMoods when clicked", () => {
    const setSelectedMoods = vi.fn();
    setup({ selectedMoods: [], setSelectedMoods });

    fireEvent.click(screen.getByText("Happiness"));
    expect(setSelectedMoods).toHaveBeenCalledWith(expect.any(Function));
    const updaterFn = setSelectedMoods.mock.calls[0][0];
    expect(updaterFn([])).toEqual(["1"]);
  });

  test("Removes a mood from selectedMoods when clicked again", () => {
    const setSelectedMoods = vi.fn();
    setup({ selectedMoods: ["1"], setSelectedMoods });

    fireEvent.click(screen.getByText("Happiness"));
    expect(setSelectedMoods).toHaveBeenCalledWith(expect.any(Function));
    const updaterFn = setSelectedMoods.mock.calls[0][0];
    expect(updaterFn(["1"])).toEqual([]);
  });

  test("Does not select more than 3 moods", () => {
    const setSelectedMoods = vi.fn();

    const extendedMoods: Mood[] = [
      { ...mockMoods[0] },
      { ...mockMoods[0], id: "2", title: "Sadness" },
      { ...mockMoods[0], id: "3", title: "Anger" },
      { ...mockMoods[0], id: "4", title: "Calm" },
    ];
    setup({
      data: extendedMoods,
      selectedMoods: ["1", "2", "3"],
      setSelectedMoods,
    });

    const calmElement = screen.getByText("Calm");
    fireEvent.click(calmElement);

    expect(setSelectedMoods).not.toHaveBeenCalled();
  });
});
