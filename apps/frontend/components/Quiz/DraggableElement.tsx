import { motion } from "framer-motion";
import { useDraggableElement } from "hooks/use-draggable-element";

export const DraggableElement = ({ constraintsRef, children }) => {
  const { position, updatePosition } = useDraggableElement();

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
      }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{ scale: 1.2 }}
      onDrag={(_, { point: { x, y } }) => console.log({ x, y })}
      onDragEnd={(_, info) =>
        updatePosition({ x: info.point.x, y: info.point.y })
      }
    >
      {children}
    </motion.div>
  );
};