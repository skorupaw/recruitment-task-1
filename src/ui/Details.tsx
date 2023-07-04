import { AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export type DetailsProps = {
  emoji?: string;
  title?: string;
  description?: string;
  word?: {
    pronunciation: string;
    definitions: string[];
    partOfSpeech: string;
  };
};

export function Details({ word, emoji, title, description }: DetailsProps) {
  const navigate = useNavigate();
  const mood = { word, emoji, title };
  return (
    <AnimatePresence>
      {mood && word && (
        <section className="relative w-full overflow-hidden rounded-xl border border-neutral-50 bg-white shadow-lg">
          <button
            className="group absolute right-2 top-2 z-10 rounded-full fill-slate-500 p-2 text-lg hover:border-slate-500 hover:bg-slate-400"
            onClick={() => navigate("/")}
          >
            <XMarkIcon className="h-4 w-4 fill-slate-500 group-hover:fill-white" />
          </button>
          <div className="relative flex h-32 w-full items-center justify-center bg-slate-100 p-4">
            <p className="italic text-slate-300">
              {"„"}
              {description}
              {"”"}
            </p>
            <div className="absolute bottom-0 left-5 inline-flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-xl border bg-white">
              <p className="text-2xl">{emoji}</p>
            </div>
          </div>
          <div className="px-5 py-8">
            <div className="border-b py-3">
              <h2 className="font-serif text-2xl font-bold">
                {title}
                <span className="mx-3 font-sans text-lg font-light italic text-neutral-300">
                  {word.pronunciation}
                </span>
              </h2>
            </div>
            <div className="py-2">
              <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold uppercase text-slate-500">
                {word.partOfSpeech}
              </span>
              <ol className="list-decimal px-5 py-2 pt-3 text-sm font-light text-neutral-500">
                {word.definitions.map((definition) => (
                  <li className="py-0.5">{definition}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}
    </AnimatePresence>
  );
}

export default Details;
