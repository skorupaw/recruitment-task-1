export function CTA({
  onSend = () => null,
}: {
  onSend?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex justify-end">
      <button
        className="inline-flex flex-grow-0 rounded-3xl border border-neutral-300 bg-white px-6 py-3 text-sm font-bold shadow-sm hover:bg-neutral-100"
        onClick={onSend}
      >
        Send
      </button>
    </div>
  );
}

export default CTA;
