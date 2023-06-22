import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";

export type CardProps = {
  emoji: string;
  title: string;
  description: string;
  // Need for the next part of the task
  isSelected?: boolean;
  onSelect?: () => void;
};

const cardStyle = cva(
  "w-80 h-56 bg-white rounded-xl p-5 cursor-pointer border relative",
  {
    variants: {
      selected: {
        false: "border-neutral-50",
        true: "border-2 border-green-500",
      },
    },
  }
);

export function Card({
  emoji,
  title,
  description,
  isSelected,
  onSelect = () => null,
}: CardProps) {
  return (
    <motion.article
      data-testid={`mood-card-${title}`}
      whileHover={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)", y: -4 }}
      whileTap={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", y: 1 }}
      style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      className={cardStyle({ selected: isSelected })}
      onClick={onSelect}
      layout
      transition={{
        type: "spring",
        duration: 0.25,
      }}
    >
      <AnimatePresence>
        {isSelected && <div className="absolute top-2 right-2">{"✅"}</div>}
      </AnimatePresence>
      <div className="border-b py-3">
        <h2 className="font-bold text-2xl font-serif">
          {title} {emoji}
        </h2>
      </div>
      <div className="py-2">
        <span className="text-xs bg-slate-100 px-2 font-semibold py-1 rounded-full inline-flex">
          NOUN
        </span>
        <ol className="list-decimal px-4 pt-3 text-sm py-2 font-light text-neutral-500">
          <li>{description}</li>
        </ol>
      </div>
    </motion.article>
  );
}

export default Card
