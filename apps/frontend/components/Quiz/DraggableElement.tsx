/* eslint-disable jsx-a11y/no-static-element-interactions */
import { createStyles, Input } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { QuestionElementType } from '@prisma/client';
import { motion } from 'framer-motion';
import {
  Coordinates,
  Dimensions,
  useCalculateCoordinates,
  useDraggableElement,
} from 'hooks/use-draggable-element';
import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { updateContent } from 'services/api/slide';

interface Props {
  constraintsRef: RefObject<HTMLDivElement>;
  initial: Coordinates;
  dimensions: Dimensions;
  content: {
    id: string;
    type: QuestionElementType;
    value: string;
  };
  id: string;
}

export const DraggableElement = ({
  constraintsRef,
  initial,
  dimensions,
  content,
  id,
}: Props) => {
  const { classes } = useStyles();
  const didMount = useRef(false);

  const { updatePosition } = useDraggableElement({
    id,
    ref: constraintsRef,
    dimensions,
  });

  const { coordinates } = useCalculateCoordinates({
    ref: constraintsRef,
    ratio: initial,
  });

  const [text, setText] = useState(content.value);
  const [isEditing, setIsEditing] = useState(false);

  const [debounced] = useDebouncedValue(text, 1000);

  useEffect(() => {
    if (didMount.current) {
      updateContent(content.id, {
        content: debounced,
      });
    } else didMount.current = true;
  }, [debounced]);

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
          background: `url(${content.type === 'IMAGE' ? content.value : ''})`,
          backgroundSize: 'cover',
        }}
      >
        {content.type === 'TEXT' && (
          <div>
            {isEditing ? (
              <Input
                variant="unstyled"
                value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
                className={cn([isEditing && classes.editing, classes.input])}
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div onClick={() => setIsEditing(true)}>{text}</div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const useStyles = createStyles((theme) => ({
  input: {
    border: '1px solid transparent',
  },
  editing: {
    border: `1px solid ${theme.colors.gray[5]} !important`,
  },
}));
