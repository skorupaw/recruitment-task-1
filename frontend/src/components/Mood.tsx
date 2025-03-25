import { Mood } from "@/api-types/common";
import useFetch from "@/hooks/useFetch";
import { DictionaryCard, DictionaryCardSkeleton } from "@/ui";
import { useParams } from "react-router";

export function MoodDetails() {
  const { moodId } = useParams();

  const { data, loading } = useFetch<Mood>(`/api/moods/${moodId}`);
  if (loading || !data) return <DictionaryCardSkeleton />;
  return <DictionaryCard {...data} />;
}

export default MoodDetails;
