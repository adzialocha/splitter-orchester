import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Footer({ children, className }: Props): JSX.Element {
  return <footer className={className}>{children}</footer>;
}
