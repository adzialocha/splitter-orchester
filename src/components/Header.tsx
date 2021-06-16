import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Header({ children, className }: Props): JSX.Element {
  return <header className={className}>{children}</header>;
}
