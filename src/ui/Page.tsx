export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-12 py-4">
      <div className="lg:w-[984px] md:w-full m-auto">{children}</div>
    </div>
  );
}
