import { useWindowWidth } from '@react-hook/window-size/throttled';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { randomRange } from '~/random';

import Box from '~/components/Box';

type Props = {
  children: React.ReactNode;
  order: number;
};

// Throttle window size changes in fps
const THROTTLE_FPS = 1;

// Distribute items in a grid with cell size in px, see `.parallax-element`
// class
const GRID_SIZE = 500;

// Move elements position randomly within this range in px
const RANDOMNESS = 25;

export default function ParallaxElement({
  children,
  order,
}: Props): JSX.Element {
  const width = useWindowWidth({
    fps: THROTTLE_FPS,
  });

  // Calculate how many columns we have to place our element inside
  const count = useMemo(() => {
    return Math.max(1, Math.floor(width / GRID_SIZE));
  }, [width]);

  // Find out in which column and row this element will be placed
  const [column, row] = useMemo(() => {
    return [order % count, Math.floor(order / count)];
  }, [order, count]);

  const className = useMemo(() => {
    const value = randomRange(0, column >= count / 2 ? 2 : 4);
    return `md:parallax-element-${value}`;
  }, [column, count]);

  // Calculate offset to left border for centering grid
  const offset = useMemo(() => {
    return Math.round((width - count * GRID_SIZE) / 4);
  }, [count, width]);

  // Get position of this element
  const [top, left] = useMemo(() => {
    return [
      row * GRID_SIZE + randomRange(-RANDOMNESS, RANDOMNESS),
      column * GRID_SIZE + randomRange(-RANDOMNESS, RANDOMNESS) + offset,
    ];
  }, [row, column, offset]);

  return (
    <Box
      className={clsx(
        'flex md:absolute justify-center items-center md:p-0 py-10 md:parallax-element',
        className,
      )}
      style={{ left, top }}
    >
      {children}
    </Box>
  );
}
