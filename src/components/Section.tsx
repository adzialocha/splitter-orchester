import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ className, children }: Props): JSX.Element {
  return <section className={className}>{children}</section>;
}
