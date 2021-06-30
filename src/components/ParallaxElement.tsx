import { useWindowWidth } from '@react-hook/window-size/throttled';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { randomItem, randomRange } from '~/random';

import Box from '~/components/Box';

type Props = {
  children: React.ReactNode;
  order: number;
  isDisabled?: boolean;
};

// Throttle window size changes in fps
const THROTTLE_FPS = 4;

// Distribute items in a grid with cell size in px, see `.parallax-element`
// class
const GRID_SIZE = 480;

// Move elements position randomly within this range in px
const RANDOMNESS = 50;

// Definition of different `className` variations
const VARIATIONS = [
  'parallax-element-0',
  'parallax-element-1',
  'parallax-element-2',
  'parallax-element-3',
  'parallax-element-4',
];

export default function ParallaxElement({
  children,
  order,
  isDisabled = false,
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

  // Get a random parallax class
  const className = useMemo(() => {
    return randomItem(VARIATIONS);
  }, []);

  // Calculate offset to left border for centering grid
  const offset = useMemo(() => {
    return Math.round((width - count * GRID_SIZE) / (isDisabled ? 2 : 4));
  }, [count, width, isDisabled]);

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
        'flex md:absolute justify-center items-center md:p-0 py-10 md:parallax-element-base',
        {
          [`md:${className} md:parallax-element`]: !isDisabled,
        },
      )}
      style={{
        left,
        top,
      }}
    >
      {children}
    </Box>
  );
}
