export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="fixed bottom-0 left-0 z-20 flex w-full flex-col justify-end border-t border-neutral-200 bg-white p-5 shadow-sm lg:relative lg:border-none lg:bg-transparent lg:shadow-none">
      {children}
    </footer>
  );
}
