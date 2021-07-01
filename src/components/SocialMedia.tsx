import React from 'react';

import Box from '~/components/Box';
import IconFacebook from '~/components/IconFacebook';
import IconSoundcloud from '~/components/IconSoundcloud';
import List from '~/components/List';
import ListItem from '~/components/ListItem';

export default function SocialMedia(): JSX.Element {
  return (
    <Box>
      <List>
        <SocialMediaItem
          href="https://facebook.com/SplitterOrchester"
          icon={IconFacebook}
        />
        <SocialMediaItem
          href="https://soundcloud.com/splitterorchester"
          icon={IconSoundcloud}
        />
      </List>
    </Box>
  );
}

function SocialMediaItem({ icon: IconComponent, href }): JSX.Element {
  return (
    <ListItem>
      <a href={href} rel="noreferrer" target="_blank">
        <IconComponent className="w-8" />
      </a>
    </ListItem>
  );
}
