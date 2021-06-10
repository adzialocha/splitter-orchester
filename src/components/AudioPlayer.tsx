import React from 'react';

import Image from '~/components/Image';
import { useTrackedAudioPlayer } from '~/store/audio';

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
      <>
        {track.title}
        <AudioPlayerWaveform
          url={track.waveformUrl}
          total={transport.total}
          current={transport.current}
          onSeek={handleSeek}
        />
        {!isPlaying && <button onClick={handleResume}>Resume</button>}
        {isPlaying && <button onClick={handlePause}>Pause</button>}
        <button onClick={handleStop}>Stop</button>
      </>
    )
  );
}

function AudioPlayerWaveform({ url, total, current, onSeek }): JSX.Element {
  const handleClick = ({ target, clientX }) => {
    const percentage = (clientX - target.offsetLeft) / target.offsetWidth;
    const position = Math.round(percentage * total);
    onSeek(position);
  };

  return (
    <>
      <div onClick={handleClick}>
        <Image src={url} />
        {`${current} / ${total}`}
      </div>
    </>
  );
}
