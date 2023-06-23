export type Mood = {
  id: string
  emoji: string
  title: string
  description: string
}

export type Pagination = {
  skip: number;
  limit: number;
  count: number;
};

export type GetMoodsResponse = {
  moods: Mood[];
  pagination: Pagination;
};

export type SaveCurrentMoodBody = {
  moodIds: string[];
};
