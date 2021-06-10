import React from 'react';

import { useTrackedAudioPlayer } from '~/store/audio';

type Props = {
  url: string;
  caption?: string;
};

export default function EmbedAudio({ url }: Props): JSX.Element {
  const [, dispatch] = useTrackedAudioPlayer();

  const handleClick = () => {
    dispatch({ type: 'play', url });
  };

  return (
    <>
      {url}
      <button onClick={handleClick}>Play</button>
    </>
  );
}
