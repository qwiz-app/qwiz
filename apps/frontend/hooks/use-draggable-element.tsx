import { RefObject, useEffect, useState } from 'react';
import { updatePoint } from 'services/api/slide';

interface UseDraggableElementProps {
  id: string;
  ref: RefObject<HTMLDivElement>;
  dimensions: Dimensions;
}

export const useDraggableElement = ({
  id,
  ref,
  dimensions,
}: UseDraggableElementProps) => {
  const { calculateRatio } = useCalculateRatio({
    ref,
  });

  const updatePosition = ({ x, y }: Coordinates) => {
    const coords = calculateOffset({ dimensions, x, y });
    const ratio = calculateRatio(coords);

    updatePoint(id, ratio);
  };

  return {
    updatePosition,
  };
};

type CalculateOffsetProps = {
  dimensions: Dimensions;
} & Coordinates;

export const calculateOffset = ({ dimensions, x, y }: CalculateOffsetProps) => {
  const { width, height } = dimensions;

  return {
    x: x - width / 2,
    y: y - height / 2,
  };
};

interface UseCalculateRatioProps {
  ref: RefObject<HTMLDivElement>;
}

export const useCalculateRatio = ({ ref }: UseCalculateRatioProps) => {
  const [dimensions, setDimensions] = useState<Coordinates>(null);

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

interface UseCalculateCoordinatesProps {
  ratio: Coordinates;
  ref: RefObject<HTMLDivElement>;
}

export const useCalculateCoordinates = ({
  ratio,
  ref,
}: UseCalculateCoordinatesProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
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

export const OFFSET: Coordinates = {
  x: 216,
  y: 68,
};

export interface Dimensions {
  width: number;
  height: number;
}

export interface Coordinates {
  x: number;
  y: number;
}
