import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function ListItem({ children }: Props): JSX.Element {
  return <li className="mx-1">{children}</li>;
}
