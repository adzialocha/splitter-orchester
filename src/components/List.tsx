import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function List({ children }: Props): JSX.Element {
  return <ul className="flex justify-center mt-5">{children}</ul>;
}
