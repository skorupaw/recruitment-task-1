import { memo } from "react";

export const Counter = memo(({ count }: { count?: number }) => {
  return (
    <div className="flex items-center">
      {count && count >= 0 ? (
        <p className="text-muted-foreground text-sm">Count: {count}</p>
      ) : (
        <div className="h-3.5" />
      )}
    </div>
  );
});
