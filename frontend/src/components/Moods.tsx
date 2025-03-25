import { Mood } from "@/api-types/common";
import { MoodCard, toast } from "@/ui";
import MoodCardsLoader from "./MoodCardsLoader/MoodCardsLoader";

export type MoodsProps = {
  data: Mood[] | undefined;
  loading: boolean;
  selectedMoods: Mood["id"][];
  setSelectedMoods: React.Dispatch<React.SetStateAction<Mood["id"][]>>;
};

export function Moods({
  data,
  loading,
  selectedMoods,
  setSelectedMoods,
}: MoodsProps) {
  const handleMoodSelect = (selectedMoodId: Mood["id"]) => {
    if (selectedMoods.length >= 3 && !selectedMoods.includes(selectedMoodId)) {
      toast.error("You can only select up to 3 moods");
      return;
    }
    if (selectedMoods.includes(selectedMoodId)) {
      setSelectedMoods((prev) => prev.filter((id) => id !== selectedMoodId));
      return;
    }
    setSelectedMoods((prev) => [...prev, selectedMoodId]);
  };

  if (loading || !data) return <MoodCardsLoader />;
  return data.map((mood) => (
    <MoodCard
      key={mood.id}
      {...mood}
      onSelect={() => handleMoodSelect(mood.id)}
      isSelected={selectedMoods.includes(mood.id)}
    />
  ));
}

export default Moods;
