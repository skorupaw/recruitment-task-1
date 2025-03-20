import { Mood, Pagination } from "./common";
export * from "./common";

export type GetMoodsResponse = {
  moods: Mood[];
  pagination: Pagination;
};

export type GetMoodResponse = Mood;

export type SaveCurrentMoodBody = {
  moodIds: string[];
};

export type SaveCurrentMoodResponse = Mood[];
