import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Article({ children }: Props): JSX.Element {
  return <article>{children}</article>;
}
