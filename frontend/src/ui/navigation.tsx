import { Button } from "@/ui/primitives/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { useCallback, useMemo } from "react";

export type NavigationProps = {
  onNext?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPrevious?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  isPreviousHidden?: boolean;
  isNextHidden?: boolean;
};

export function Navigation({
  isNextDisabled,
  isPreviousDisabled,
  onNext = () => null,
  onPrevious = () => null,
}: NavigationProps) {
  const handleNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onNext(event);
    },
    [onNext],
  );

  const handlePrevious = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onPrevious(event);
    },
    [onPrevious],
  );

  const MemoizedMoveLeft = useMemo(() => <MoveLeft />, []);
  const MemoizedMoveRight = useMemo(() => <MoveRight />, []);

  return (
    <div className="flex justify-center gap-2">
      <Button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        variant="ghost"
        size="icon"
      >
        {MemoizedMoveLeft}
        <span className="sr-only">Previous page</span>
      </Button>
      <Button
        onClick={handleNext}
        disabled={isNextDisabled}
        variant="ghost"
        size="icon"
      >
        {MemoizedMoveRight}
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
