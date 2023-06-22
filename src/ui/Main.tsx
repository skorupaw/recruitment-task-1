export function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-3 w-full py-4 justify-center lg:justify-start">
      {children}
    </div>
  );
}
