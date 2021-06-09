import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export default function Box({
  children,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div {...props}>{children}</div>;
}
