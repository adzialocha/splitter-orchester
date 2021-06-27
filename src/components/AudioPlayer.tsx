import React from 'react';

import { useTrackedAudioPlayer } from '~/state';

import Box from '~/components/Box';
import Image from '~/components/Image';

export default function AudioPlayer(): JSX.Element {
  const [audioState, dispatch] = useTrackedAudioPlayer();
  const { url, isPlaying, transport, track } = audioState;

  const handlePause = () => {
    dispatch({ type: 'pause' });
  };

  const handleResume = () => {
    dispatch({ type: 'resume' });
  };

  const handleStop = () => {
    dispatch({ type: 'stop' });
  };

  const handleSeek = (position) => {
    dispatch({ type: 'seek', position });
  };

  return (
    url && (
      <Box className="fixed inset-x-0 bottom-0 p-5 text-gray bg-white">
        {track.title}
        <AudioPlayerWaveform
          total={transport.total}
          url={track.waveformUrl}
          onSeek={handleSeek}
        />
        {!isPlaying && <button onClick={handleResume}>Resume</button>}
        {isPlaying && <button onClick={handlePause}>Pause</button>}
        <button onClick={handleStop}>Stop</button>
      </Box>
    )
  );
}

function AudioPlayerWaveform({ url, total, onSeek }): JSX.Element {
  const handleClick = ({ target, clientX }) => {
    const percentage = (clientX - target.offsetLeft) / target.offsetWidth;
    const position = Math.round(percentage * total);
    onSeek(position);
  };

  return (
    <Box
      className="h-5 sm:h-20 bg-gray filter contrast-200"
      onClick={handleClick}
    >
      <Image className="w-full h-full bg-cover" src={url} />
    </Box>
  );
}
