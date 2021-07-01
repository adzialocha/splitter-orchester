import React from 'react';

type Props = {
  path: string;
  className?: string;
  viewBox?: string;
  isInverted?: boolean;
};

const COLOR_DEFAULT = 'white';
const COLOR_INVERTED = '#231f20';

export default function IconBase({
  className,
  path,
  viewBox = '0 0 1200 1200',
  isInverted = false,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} fill={isInverted ? COLOR_INVERTED : COLOR_DEFAULT} />
    </svg>
  );
}
