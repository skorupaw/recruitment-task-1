type Word = {
  pronunciation: string;
  definitions: string[];
  partOfSpeech: string;
};

type Mood = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  word: Word;
};

type DataEntry = Omit<Mood, "word" | "id"> & Word & { id: number };

type Pagination = {
  skip: number;
  limit: number;
  count: number;
};

const entryToMood = ({
  id,
  partOfSpeech,
  definitions,
  pronunciation,
  ...rest
}: DataEntry): Mood => ({
  ...rest,
  id: `${id}`,
  word: { partOfSpeech, definitions, pronunciation },
});

export const moods =
  (entries: DataEntry[]) =>
  ({
    skip = 0,
    limit,
    search,
  }: {
    skip: number;
    limit?: number;
    search?: string;
  }): { moods: Mood[]; pagination: Pagination } => {
    const filteredEntries = search
      ? entries.filter((mood) =>
          mood.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        )
      : entries;

    const filteredAndPaginatedEntries =
      limit !== undefined && limit >= 0
        ? filteredEntries.slice(skip, limit)
        : filteredEntries.slice(skip);

    const moods = filteredAndPaginatedEntries.map(entryToMood);

    return {
      moods,
      pagination: { skip, limit: limit ?? 0, count: filteredEntries.length },
    };
  };

export const mood =
  (entries: DataEntry[]) =>
  (id: string): Mood | undefined => {
    return entries.map(entryToMood).find((entry) => `${entry.id}` === id);
  };

export const saveCurrentMood =
  (entries: DataEntry[]) =>
  (moodIds: string[]): Mood[] => {
    return moodIds
      .map((id) => entries.find((mood) => `${mood.id}` === id))
      .filter(Boolean)
      .map((item) => entryToMood(item as DataEntry));
  };

export default (entries: DataEntry[]) => ({
  moods: moods(entries),
  mood: mood(entries),
  saveCurrentMood: saveCurrentMood(entries),
});
