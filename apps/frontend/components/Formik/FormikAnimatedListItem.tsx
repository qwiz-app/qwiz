import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id: string;
}

export const FormikAnimatedListItem = ({ children, id }: Props) => {
  return <motion.div layoutId={id}>{children}</motion.div>;
};
