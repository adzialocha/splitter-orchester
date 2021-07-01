import clsx from 'clsx';
import React from 'react';

import locale from '~/locale';
import type { NavigationItem } from '~/types';

import Container from '~/components/Container';
import Logo from '~/components/Logo';
import NavigationFooter from '~/components/NavigationFooter';
import Paragraph from '~/components/Paragraph';
import SocialMedia from '~/components/SocialMedia';

type Props = {
  navigation: NavigationItem[];
  isVisible?: boolean;
};

export default function Footer({
  navigation,
  isVisible = true,
}: Props): JSX.Element {
  return (
    <footer
      className={clsx('pt-5 sm:pt-10 pb-36', {
        'md:hidden': !isVisible,
      })}
    >
      <Container className="mt-20 text-center">
        <Logo className="m-auto mb-5 w-48" />
        <Paragraph className="mb-3">
          <strong>{locale.title}</strong>
        </Paragraph>
        <NavigationFooter items={navigation} />
        <SocialMedia />
      </Container>
    </footer>
  );
}
