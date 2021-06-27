import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Paragraph({ children, className }: Props): JSX.Element {
  return <p className={className}>{children}</p>;
}
