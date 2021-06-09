import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export default function Header({ children }: Props): JSX.Element {
  return <header>{children}</header>;
}
