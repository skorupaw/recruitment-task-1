import { Mood, Pagination } from "./common";
export * from "./common";

/**
 * NOTE: Depends of what kind of filed were chosen in the query,
 * this type assumes all of them.
 */
export type MoodsData = {
  moods: {
    moods: Mood[];
    pagination: Pagination;
  };
};

export type MoodsVariables = {
  skip?: number;
  limit?: number;
  search?: string;
};

export type MoodData = Mood;

export type MoodVariables = { id: number };

export type SaveCurrentMoodData = {
  saveCurrentMood: {
    moods: Mood[];
  };
};

export type SaveCurrentMoodVariables = {
  moodIds: string[];
};
