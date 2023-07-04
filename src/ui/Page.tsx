export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-12 py-4 text-neutral-900">
      <div className="m-auto md:w-full lg:w-[984px]">{children}</div>
    </div>
  );
}
