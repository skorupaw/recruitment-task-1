import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

export type NavigationProps = {
  onNext?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPrevious?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  count?: number;
};

export function Navigation({
  isNextDisabled,
  isPreviousDisabled,
  count,
  onNext = () => null,
  onPrevious = () => null,
}: NavigationProps) {
  return (
    <div className="flex w-full justify-between items-center py-4">
      {count && count >= 0 ? (
        <p className="text-neutral-500 text-sm font-semibold">Count: {count}</p>
      ) : (
        <div />
      )}
      <div className="flex gap-2 justify-center">
        {!isPreviousDisabled && (
          <button
            className="text-lg hover:bg-neutral-100 hover:border-neutral-100 p-3 rounded-full"
            onClick={onPrevious}
          >
            <ArrowLongLeftIcon className="w-5 h-5" />
          </button>
        )}
        {!isNextDisabled && (
          <button
            className="text-lg hover:bg-neutral-100 hover:border-neutral-100 p-3 rounded-full"
            onClick={onNext}
          >
            <ArrowLongRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
