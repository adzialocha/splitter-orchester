import React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function Link({ children, href, ...props }: Props): JSX.Element {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
