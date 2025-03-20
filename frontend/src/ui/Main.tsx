import { memo } from "react";

export const Main = memo<{ children: React.ReactNode }>(({ children }) => {
  return (
    <main className="mb-32 grid w-full grid-cols-1 gap-4 py-4 lg:mb-0 lg:grid-cols-3">
      {children}
    </main>
  );
});
Main.displayName = "Main";
