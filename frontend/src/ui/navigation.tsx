import { Button } from "@/ui/primitives/button";
import { MoveLeft, MoveRight } from "lucide-react";

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
  return (
    <div className="flex justify-center gap-2">
      <Button onClick={onPrevious} disabled={isPreviousDisabled} variant="ghost" size="icon">
        <MoveLeft />
        <span className="sr-only">Previous page</span>
      </Button>
      <Button onClick={onNext} disabled={isNextDisabled} variant="ghost" size="icon">
        <MoveRight />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
