import clsx from 'clsx';
import React, { useCallback } from 'react';

import { useTrackedAudioPlayer } from '~/state';

import Box from '~/components/Box';
import IconPlay from '~/components/IconPlay';
import IconStop from '~/components/IconStop';
import Paragraph from '~/components/Paragraph';

type Props = {
  url: string;
  caption?: string;
  className?: string;
};

export default function EmbedAudio({
  url,
  caption,
  className,
}: Props): JSX.Element {
  const [audioState, dispatch] = useTrackedAudioPlayer();
  const isCurrentTrack = audioState.url === url;

  const handleClick = useCallback(() => {
    if (isCurrentTrack) {
      dispatch({ type: 'stop' });
    } else {
      dispatch({ type: 'play', url, caption });
    }
  }, [isCurrentTrack, caption, dispatch, url]);

  return (
    <Box
      className={clsx(
        'group flex items-end px-3 md:px-5 pb-3 my-8 md:my-16 h-40 text-gray bg-white cursor-pointer',
        className,
      )}
      onClick={handleClick}
    >
      {isCurrentTrack ? (
        <IconStop className="w-6 md:w-7" isInverted />
      ) : (
        <IconPlay className="w-6 md:w-7" isInverted />
      )}
      <Paragraph className="md:pb-1 pl-2 w-full group-hover:underline ellipsis">
        {caption || url}
      </Paragraph>
    </Box>
  );
}
