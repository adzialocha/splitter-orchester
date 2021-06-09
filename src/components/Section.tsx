import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Section({ children }: Props): JSX.Element {
  return <section>{children}</section>;
}
