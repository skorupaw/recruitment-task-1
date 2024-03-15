export type NoResultsProps = {
  search?: string;
};

export function NoResults({ search }: NoResultsProps) {
  return (
    <div className="flex justify-center">
      <p>
        No moods{" "}
        {search && (
          <>
            containing <span className="font-bold">{search}</span>
          </>
        )}{" "}
        found!
      </p>
    </div>
  );
}
