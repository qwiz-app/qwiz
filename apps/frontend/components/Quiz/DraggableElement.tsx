import { QuestionElementType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { motion } from 'framer-motion';
import {
  useCalculateCoordinates,
  useDraggableElement,
} from 'hooks/use-draggable-element';
import { RefObject, useRef } from 'react';

interface Props {
  constraintsRef: RefObject<HTMLDivElement>;
  initial: {
    x: Decimal;
    y: Decimal;
  };
  dimensions: {
    width: number;
    height: number;
  };
  type: QuestionElementType;
  content: string;
  id: string;
}

export const DraggableElement = ({
  constraintsRef,
  initial,
  dimensions,
  type,
  content,
  id,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { updatePosition } = useDraggableElement({
    id,
    ref: constraintsRef,
    dimensions,
    divRef: ref,
  });


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
      <div
        style={{
          cursor: 'pointer',
          minWidth: dimensions.width,
          minHeight: dimensions.height,
          background: `url(${type === 'IMAGE' ? content : ''})`,
          backgroundSize: 'cover',
        }}
        ref={ref}
      >
        {type === 'TEXT' && content}
      </div>
    </motion.div>
  );
};
