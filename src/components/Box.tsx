import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Box({ children, ...props }: Props): JSX.Element {
  return <div {...props}>{children}</div>;
}
