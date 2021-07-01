import React from 'react';

import Box from '~/components/Box';
import IconFacebook from '~/components/IconFacebook';
import IconSoundcloud from '~/components/IconSoundcloud';

export default function SocialMedia(): JSX.Element {
  return (
    <Box>
      <ul className="flex justify-center mt-5">
        <SocialMediaItem
          href="https://facebook.com/SplitterOrchester"
          icon={IconFacebook}
        />
        <SocialMediaItem
          href="https://soundcloud.com/splitterorchester"
          icon={IconSoundcloud}
        />
      </ul>
    </Box>
  );
}

function SocialMediaItem({ icon: IconComponent, href }): JSX.Element {
  return (
    <li>
      <a href={href} rel="noreferrer" target="_blank">
        <IconComponent className="mx-1 w-8" />
      </a>
    </li>
  );
}
