import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Article({ children, className }: Props): JSX.Element {
  return <article className={className}>{children}</article>;
}
