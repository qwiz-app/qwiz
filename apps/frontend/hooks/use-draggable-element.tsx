import { useState } from "react";

export const useDraggableElement = () => {
  const [position] = useState({
    x: 0,
    y: 0,
  });

  const updatePosition = ({ x, y }) => {
    console.log({ x: x - 250, y: y - 82 }, 'updatePosition');
  };

  return {
    position,
    updatePosition,
  };
};
