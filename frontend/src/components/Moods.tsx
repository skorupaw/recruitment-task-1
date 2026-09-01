import { MoodCard } from "@/ui/mood-card";
import { MoodCardSkeleton } from "@/ui/mood-card-skeleton";
import { NoResults } from "@/ui/no-results";
import { useMoodsContext } from "@/lib/moods-context";

export function Moods() {
  const { moods, isLoading, selectedIds, toggleSelect } = useMoodsContext();

  if (isLoading) {
    return (
      <>
        <MoodCardSkeleton />
        <MoodCardSkeleton />
        <MoodCardSkeleton />
      </>
    );
  }

  if (moods.length === 0) {
    return <NoResults />;
  }

  return (
    <>
      {moods.map((mood) => (
        <MoodCard
          key={mood.id}
          id={mood.id}
          emoji={mood.emoji}
          title={mood.title}
          word={mood.word}
          description={mood.description}
          isSelected={selectedIds.includes(mood.id)}
          onSelect={() => toggleSelect(mood.id)}
        />
      ))}
    </>
  );
}

export default Moods;
