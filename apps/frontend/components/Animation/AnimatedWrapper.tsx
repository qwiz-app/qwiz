import { motion } from 'framer-motion';
import { spring } from 'lib/framer';

interface Props {
  layoutId: string;
  className: string;
}

export const AnimatedWrapper = ({ layoutId, className }: Props) => {
  return (
    <motion.span
      className={className}
      layoutId={layoutId}
      initial={false}
      transition={spring}
    />
  );
};
