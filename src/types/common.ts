type Word = {
  id: string;
  pronunciation: string;
  definitions: string[];
  partOfSpeech: string;
};

export type Mood = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  word: Word;
};

export type Pagination = {
  skip: number;
  limit: number;
  count: number;
};
