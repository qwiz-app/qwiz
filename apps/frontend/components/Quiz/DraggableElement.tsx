import { motion } from 'framer-motion';
import {
  useCalculateCoordinates,
  useDraggableElement,
} from 'hooks/use-draggable-element';
import { ReactNode, RefObject } from 'react';

interface Props {
  constraintsRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  initial: {
    x: number;
    y: number;
  };
  id: string;
}

export const DraggableElement = ({
  constraintsRef,
  children,
  initial,
  id,
}: Props) => {
  const { updatePosition } = useDraggableElement({ id, ref: constraintsRef });

  const { coordinates } = useCalculateCoordinates({
    ref: constraintsRef,
    ratio: initial,
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: coordinates.y,
        left: coordinates.x,
      }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{ scale: 1.2 }}
      onDragEnd={(_, info) =>
        updatePosition({ x: info.point.x, y: info.point.y })
      }
    >
      {children}
    </motion.div>
  );
};
