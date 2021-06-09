import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export default function Footer({ children }: Props): JSX.Element {
  return <footer>{children}</footer>;
}
