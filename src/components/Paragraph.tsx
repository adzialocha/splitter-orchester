import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Paragraph({ children }: Props): JSX.Element {
  return <p>{children}</p>;
}
