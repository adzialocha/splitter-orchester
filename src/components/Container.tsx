import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props): JSX.Element {
  return <div className="container mx-auto px-5">{children}</div>;
}
