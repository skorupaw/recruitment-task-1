import { createFileRoute } from "@tanstack/react-router";
import Mood from "@/components/Mood";

export const Route = createFileRoute("/mood/$moodId")({
  component: Mood,
});
