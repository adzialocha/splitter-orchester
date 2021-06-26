import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props): JSX.Element {
  return <div className="container px-5 mx-auto">{children}</div>;
}
