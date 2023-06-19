import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";

export type CardProps = {
  emoji: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const cardStyle = cva("bg-white rounded-xl w-52 h-60 border-2 border-solid flex flex-col shadow-md relative cursor-pointer", {
  variants: {
    selected: {
      false: 'border-neutral-200',
      true: 'border-green-500' 
    }
  }
})

export function Card({ emoji, title, description, isSelected, onSelect = () => null }: CardProps) {
  return (
    <motion.article whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.95 }} className={cardStyle({ selected: isSelected })} onClick={onSelect}>
      <AnimatePresence>
      {isSelected && (<div className="absolute top-2 right-2">
        {"✅"}
      </div>)} 
      </AnimatePresence>
      <div className="flex justify-center items-center w-ful py-4">
        <span className="text-6xl" role="img">{emoji}</span>
      </div>
      <div className="flex flex-col justify-center items-center pb-6 px-2">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-center">{description}</p>
      </div> 
    </motion.article>
  )
}

export default Card
