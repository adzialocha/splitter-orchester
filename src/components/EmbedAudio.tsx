import clsx from 'clsx';
import React, { useCallback } from 'react';

import { useTrackedAudioPlayer } from '~/state';

import Box from '~/components/Box';
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
      {isCurrentTrack ? <EmbedAudioPlayStop /> : <EmbedAudioPlayIcon />}
      <Paragraph className="pb-3 pl-2 w-full group-hover:underline ellipsis">
        {caption || url}
      </Paragraph>
    </Box>
  );
}

function EmbedAudioPlayIcon(): JSX.Element {
  return (
    <svg
      className="w-12"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416zM384 288l384 224-384 224z"
        fill="#231f20"
      />
    </svg>
  );
}

function EmbedAudioPlayStop(): JSX.Element {
  return (
    <svg
      className="w-12"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416zM320 320h384v384h-384z"
        fill="#231f20"
      />
    </svg>
  );
}
