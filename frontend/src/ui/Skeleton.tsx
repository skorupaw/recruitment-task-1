import { HTMLMotionProps, motion } from "framer-motion";

export function Skeleton({
  children,
  ...props
}: HTMLMotionProps<"div"> & { children?: React.ReactNode }) {
  return (
    <motion.div
      {...props}
      animate={{ backgroundColor: ["#f9fafb", "#d4d4d4", "#f9fafb"] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
}

export default Skeleton;
