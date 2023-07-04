export function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-64 flex w-full flex-wrap justify-center gap-3 py-4 lg:mb-0 lg:justify-start">
      {children}
    </div>
  );
}
