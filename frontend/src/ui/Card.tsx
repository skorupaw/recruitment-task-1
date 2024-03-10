import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "./CardSkeleton";

export type CardProps =
  | {
      id: string;
      emoji: string;
      title: string;
      description: string;
      isLoading?: false;
      isSelected?: boolean;
      onSelect?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | { isLoading: true };

const cardStyle = cva(
  "w-full lg:w-80 h-64 bg-white rounded-xl p-5 cursor-pointer border relative",
  {
    variants: {
      selected: {
        false: "border-neutral-50",
        true: "border-2 border-green-500",
      },
    },
  },
);

export function Card(props: CardProps) {
  const navigate = useNavigate();

  if (props.isLoading) {
    return <CardSkeleton />;
  }

  const {
    id,
    title,
    emoji,
    description,
    isSelected,
    onSelect = () => null,
  } = props;

  return (
    <motion.article
      data-testid={`mood-card-${title}`}
      whileHover={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)", y: -4 }}
      whileTap={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", y: 1 }}
      style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      className={cardStyle({ selected: isSelected })}
      onClick={() => navigate(`/mood/${id}`)}
      layout
      transition={{
        type: "spring",
        duration: 0.25,
      }}
      aria-checked={isSelected}
    >
      <AnimatePresence>
        <label
          className="absolute top-2 right-2 inline-flex"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="peer appearance-none relative w-6 h-6 rounded-full border inline-flex justify-center items-center cursor-pointer border-neutral-200 bg-neutral-100 hover:bg-neutral-200 checked:border-green-500 checked:bg-green-500 checked:hover:bg-green-600"
            onChange={(e) => onSelect(e)}
            checked={isSelected}
          />
          <CheckIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none hidden peer-checked:block fill-white " />
        </label>
      </AnimatePresence>
      <div className="border-b py-3">
        <h3 className="font-serif text-2xl font-bold">
          {title} {emoji}
        </h3>
      </div>
      <div className="py-2">
        <p className="py-2 pt-3 text-sm font-light text-neutral-500">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

export default Card;
