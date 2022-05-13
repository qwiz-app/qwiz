import { useEffect, useState } from 'react';
import { updatePoint } from 'services/api/slide';

export const useDraggableElement = ({ id, ref, dimensions, divRef }) => {
  const { calculateRatio } = useCalculateRatio({
    ref,
  });

  const updatePosition = ({ x, y }) => {
    console.log(divRef?.current?.getBoundingClientRect());
    const coords = calculateOffset({ dimensions, x, y });
    const ratio = calculateRatio(coords);

    updatePoint(id, ratio);
  };

  return {
    updatePosition,
  };
};

export const calculateOffset = ({ dimensions, x, y }) => {
  const { width, height } = dimensions;

  return {
    x: x - width / 2,
    y: y - height / 2,
  };
};

export const useCalculateRatio = ({ ref }) => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    setDimensions({
      x: ref.current.clientWidth,
      y: ref.current.clientHeight,
    });
  }, []);

  const calculateRatio = ({ x, y }) => {
    return {
      x: (x - OFFSET.x) / dimensions.x,
      y: (y - OFFSET.y) / dimensions.y,
    };
  };

  return { calculateRatio };
};

export const useCalculateCoordinates = ({ ratio, ref }) => {
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setCoordinates({
      x: ratio.x * ref.current.clientWidth,
      y: ratio.y * ref.current.clientHeight,
    });
  }, []);

  return { coordinates };
};

export const OFFSET = {
  x: 216,
  y: 68,
};
