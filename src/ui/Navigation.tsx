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
    <div className="flex w-full justify-between items-center py-4 border-b-2 border-solid border-neutral-200">
      {(count && count >= 0) ? (
        <p className="text-xs text-neutral-500 font-bold">Count: {count}</p>
      ): <div />}
      <div className="flex gap-2 justify-center">
        {!isPreviousDisabled && (
          <button className="text-lg" onClick={onPrevious}>
            ⬅️
          </button>
        )}
        {!isNextDisabled && (
          <button className="text-lg" onClick={onNext}>
            ➡️
          </button>
        )}
      </div>
    </div>
  );
}
