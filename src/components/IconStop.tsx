import React from 'react';

import IconBase from '~/components/IconBase';

type Props = {
  className?: string;
  isInverted?: boolean;
};

export default function IconStop(props: Props): JSX.Element {
  return (
    <IconBase
      path="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416zM320 320h384v384h-384z"
      {...props}
    />
  );
}
