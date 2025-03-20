import { memo } from "react";

export const Footer = memo<{ children: React.ReactNode }>(
  ({ children }: { children: React.ReactNode }) => {
    return (
      <footer className="bg-card fixed bottom-0 left-0 z-20 flex w-full flex-col justify-end border-t px-2 py-5  shadow-sm lg:relative lg:border-none lg:px-0 lg:shadow-none">
        <div className="grid grid-cols-3">{children}</div>
      </footer>
    );
  },
);
Footer.displayName = "Footer";
