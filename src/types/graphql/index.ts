export type Mood = {
  id: string
  emoji: string
  title: string
  description: string
}

export type PaginationData = {
  skip: number;
  limit: number;
  count: number;
};
export type GetMoodsData = {
  getMoods: {
    moods: Mood[];
    pagination: PaginationData;
  };
};

export type GetMoodsVariables = {
  skip?: number,
  limit?: number,
  search?: string
}

export type SaveCurrentMoodData = {
  saveCurrentMood: {
    moods: Mood[];
  };
};

export type SaveCurrentMoodVariables = {
  moodIds: string[];
};
