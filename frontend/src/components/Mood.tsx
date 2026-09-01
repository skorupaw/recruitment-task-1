import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { DictionaryCard } from "@/ui/dictionary-card";
import { DictionaryCardSkeleton } from "@/ui/dictionary-card-skeleton";
import type { Mood as MoodType } from "@/api-types/rest";

export function MoodDetails() {
  const { moodId } = useParams({ from: "/mood/$moodId" });
  const [mood, setMood] = useState<MoodType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    setMood(null);

    fetch(`/api/moods/${moodId}`)
      .then((res) => res.json())
      .then((data) => {
        if (isCurrent) {
          setMood(data);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [moodId]);

  if (isLoading || !mood) {
    return <DictionaryCardSkeleton />;
  }

  return (
    <DictionaryCard
      emoji={mood.emoji}
      title={mood.title}
      description={mood.description}
      word={mood.word}
    />
  );
}

export default MoodDetails;
