import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Heading({ children }: Props): JSX.Element {
  return <h1 className="font-bold text-lg">{children}</h1>;
}
