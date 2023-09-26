import { motion } from "framer-motion";
import Skeleton from "./Skeleton";

export function CardSkeleton() {
  return (
    <motion.div
      className="w-full lg:w-80 h-64 bg-white rounded-xl p-5 border"
      aria-label="loading"
      role="status"
      aria-live="polite"
    >
      <div className="border-b py-3">
        <Skeleton className="w-2/3 h-6 my-1 rounded-full bg-neutral-50" />
      </div>
      <div className="py-2 pt-3 flex flex-col flex-nowrap">
        <Skeleton className="h-[14px] my-[3px] bg-neutral-50 w-full rounded-full" />
        <Skeleton className="h-[14px] my-[3px] bg-neutral-50 w-10/12 rounded-full" />
        <Skeleton className="h-[14px] my-[3px] bg-neutral-50 w-11/12 rounded-full" />
      </div>
    </motion.div>
  );
}

export default CardSkeleton;
