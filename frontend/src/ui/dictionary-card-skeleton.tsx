import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/ui/primitives/card";
import { Separator } from "@/ui/primitives/separator";
import { Skeleton } from "@/ui/primitives/skeleton";

export const DictionaryCardSkeleton = memo(() => {
  return (
    <Card
      className="relative col-span-1 h-96 w-full shadow-lg lg:col-span-3"
      aria-label="loading"
      role="loading"
      aria-live="polite"
    >
      <CardHeader className="flex flex-row items-center gap-4 px-6 pb-2 pt-6">
        <Skeleton className="size-12 rounded-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-6">
        <Skeleton className="h-8 w-48 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
        <Separator />
        <div className="space-y-3">
          <Skeleton className="h-5 w-3/4 rounded-full" />
          <Skeleton className="h-5 w-1/2 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
});
DictionaryCardSkeleton.displayName = "DictionaryCardSkeleton";
