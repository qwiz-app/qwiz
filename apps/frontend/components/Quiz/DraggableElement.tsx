import { motion } from 'framer-motion';
import { useDraggableElement } from 'hooks/use-draggable-element';

export const DraggableElement = ({ constraintsRef, children, initial, id }) => {
  const { updatePosition } = useDraggableElement({ initial, id });

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: initial.y,
        left: initial.x,
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
