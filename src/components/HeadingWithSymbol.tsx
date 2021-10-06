import clsx from 'clsx';
import React from 'react';

import Box from '~/components/Box';
import Heading from '~/components/Heading';
import Logo from '~/components/Logo';

type Props = {
  children: React.ReactNode;
  headingLevel?: string;
  className?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isOdd?: boolean;
  isSingle?: boolean;
};

export default function HeadingWithSymbol({
  children,
  className,
  headingLevel = 'h1',
  isFirst = false,
  isOdd = false,
  isSingle = false,
}: Props): JSX.Element {
  return (
    <>
      <Heading
        className={clsx('mb-5 font-black text-center md:text-left', className, {
          'mt-56': headingLevel === 'h1',
          'mt-20 md:mt-96': headingLevel === 'h2',
        })}
        level={headingLevel}
      >
        {children}
      </Heading>
      {isSingle ? null : (
        <Box className={clsx('hidden md:block relative', className)}>
          {isFirst ? (
            <HeadingWithLogo />
          ) : isOdd ? (
            <HeadingWithHollowArrow />
          ) : (
            <HeadingWithSolidArrow />
          )}
        </Box>
      )}
    </>
  );
}

function HeadingWithLogo(): JSX.Element {
  return (
    <Box className="absolute symbol-logo">
      <Logo />
    </Box>
  );
}

function HeadingWithHollowArrow(): JSX.Element {
  return (
    <Box className="absolute bg-white symbol-hollow-arrow clip-arrow-up">
      <Box className="relative w-full h-full">
        <Box className="absolute top-2 right-2 bottom-1 left-2 bg-gray clip-arrow-up" />
        <Box className="absolute top-4 right-4 bottom-2 left-4 bg-white clip-arrow-up" />
        <Box className="absolute top-6 right-6 bottom-3 left-6 bg-gray clip-arrow-up" />
      </Box>
    </Box>
  );
}

function HeadingWithSolidArrow(): JSX.Element {
  return <Box className="absolute bg-white symbol-solid-arrow clip-arrow-up" />;
}
