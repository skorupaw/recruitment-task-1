import { AnimatePresence } from "framer-motion";
import Skeleton from "./Skeleton";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function DetailsSkeleton() {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      <section
        className="relative w-full overflow-hidden rounded-xl border border-neutral-50 bg-white shadow-lg"
        aria-label="loading"
        role="status"
        aria-live="polite"
      >
        <button
          className="group absolute right-2 top-2 z-10 rounded-full fill-slate-500 p-2 text-lg hover:border-slate-500 hover:bg-slate-400"
          onClick={() => navigate("/")}
        >
          <XMarkIcon className="h-4 w-4 fill-slate-500 group-hover:fill-white" />
        </button>
        <div className="relative flex h-32 w-full items-center justify-center p-4h bg-neutral-50">
          <Skeleton className="absolute bottom-0 left-5 inline-flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-xl border" />
        </div>
        <div className="px-5 py-8">
          <div className="border-b py-3">
            <Skeleton className="h-6 my-2 w-1/3 rounded-full" />
          </div>
          <div className="py-2">
            <Skeleton className="w-14 h-6 rounded-full" />
            <div className="py-2">
              <Skeleton className="w-1/2 rounded-full h-3 my-2" />
              <Skeleton className="w-1/3 rounded-full h-3 my-2" />
            </div>
          </div>
        </div>
      </section>
    </AnimatePresence>
  );
}
