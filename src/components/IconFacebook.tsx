import React from 'react';

import IconBase from '~/components/IconBase';

type Props = {
  className?: string;
  isInverted?: boolean;
};

export default function IconFacebook(props: Props): JSX.Element {
  return (
    <IconBase
      path="M928 0h-832c-52.8 0-96 43.2-96 96v832c0 52.8 43.2 96 96 96h416v-448h-128v-128h128v-64c0-105.8 86.2-192 192-192h128v128h-128c-35.2 0-64 28.8-64 64v64h192l-32 128h-160v448h288c52.8 0 96-43.2 96-96v-832c0-52.8-43.2-96-96-96z"
      {...props}
    />
  );
}
