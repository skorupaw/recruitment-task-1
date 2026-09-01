export const NoResults = () => {
  return (
    <div className="col-span-3 flex min-h-64 flex-col items-center justify-center gap-6">
      <div className="bg-muted flex size-14 items-center justify-center rounded-full">
        <span className="text-2xl" role="img" aria-label="Sad face emoji">
          😓
        </span>
      </div>
      <p className="text-muted-foreground text-center">No moods found</p>
    </div>
  );
};
