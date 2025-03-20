import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/ui/primitives/card";
import { Skeleton } from "@/ui/primitives/skeleton";
import { memo } from "react";

export const MoodCardSkeleton = memo(() => {
  return (
    <Card
      className="h-[258px] w-full"
      aria-label="loading"
      role="loading"
      aria-live="polite"
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="flex size-12 flex-shrink-0 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
      </CardHeader>
      <CardContent className="h-20">
        <Skeleton className="h-3 w-full rounded-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-20 rounded-full" />
      </CardFooter>
    </Card>
  );
});
MoodCardSkeleton.displayName = "MoodCardSkeleton";
