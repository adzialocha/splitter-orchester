import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ children, className }: Props): JSX.Element {
  return <h1 className={clsx('font-medium text-lg', className)}>{children}</h1>;
}
