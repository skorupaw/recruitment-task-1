import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

export type NavigationProps = {
  onNext?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPrevious?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  isPreviousHidden?: boolean;
  isNextHidden?: boolean;
  count?: number;
};

export function Navigation({
  isNextDisabled,
  isPreviousDisabled,
  isNextHidden,
  isPreviousHidden,
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
        {!isPreviousHidden && (
          <button
            className="text-lg hover:bg-neutral-100 p-3 rounded-full group disabled:bg-transparent"
            onClick={onPrevious}
            disabled={isPreviousDisabled}
          >
            <ArrowLongLeftIcon className="w-5 h-5 group-disabled:text-neutral-300" />
            <span className="hidden">Previous page</span>
          </button>
        )}
        {!isNextHidden && (
          <button
            className="text-lg hover:bg-neutral-100 p-3 rounded-full group disabled:bg-transparent"
            onClick={onNext}
            disabled={isNextDisabled}
          >
            <ArrowLongRightIcon className="w-5 h-5 group-disabled:text-neutral-300" />
            <span className="hidden">Next page</span>
          </button>
        )}
      </div>
    </div>
  );
}
