export function Footer({
  onSend = () => null,
}: {
  onSend?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex w-full justify-end">
      <button
        className="px-6 py-3 text-sm rounded-3xl font-bold inline-flex border bg-white border-neutral-300 hover:bg-neutral-100 shadow-sm"
        onClick={onSend}
      >
        Send
      </button>
    </div>
  );
}
