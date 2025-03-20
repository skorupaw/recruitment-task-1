import { memo } from "react";

export const Page = memo<{ children: React.ReactNode }>(({ children }) => {
  return (
    <div className="min-h-dvh w-full">
      <div className="m-auto min-h-full px-2 md:w-full lg:w-[984px]">
        {children}
      </div>
    </div>
  );
});
Page.displayName = "Page";
