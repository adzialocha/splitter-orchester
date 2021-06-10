import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
