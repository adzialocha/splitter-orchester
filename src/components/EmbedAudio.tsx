import React from 'react';

import { useAudioPlayerState } from '~/store/audio';

type Props = {
  url: string;
  caption?: string;
};

export default function EmbedAudio({ url }: Props): JSX.Element {
  const [audioState, dispatch] = useAudioPlayerState();
  const { isPlaying } = audioState;

  const handleClick = () => {
    dispatch({ type: 'play', url });
  };

  return (
    <>
      {url}
      <button onClick={handleClick}>
        {isPlaying ? 'Playing' : 'Not Playing'}
      </button>
    </>
  );
}
