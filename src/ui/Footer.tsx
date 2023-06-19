export function Footer({
  onSend = () => null,
}: {
  onSend?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex w-full justify-end py-4">
      <button
        className="bg-green-500 px-4 py-2 text-sm rounded-3xl text-white font-bold inline-flex hover:bg-green-600"
        onClick={onSend}
      >
        Send ✉️
      </button>
    </div>
  );
}
