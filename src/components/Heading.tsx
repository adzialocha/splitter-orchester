import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  level?: string;
};

export default function Heading({
  children,
  className,
  level = 'h1',
}: Props): JSX.Element {
  return React.createElement(
    level,
    { className: clsx('text-lg', className) },
    children,
  );
}
