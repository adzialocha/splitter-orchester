import React from 'react';

import { useTrackedAudioPlayer } from '~/state';

import Box from '~/components/Box';
import Image from '~/components/Image';
import Paragraph from '~/components/Paragraph';

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
      <Box className="flex fixed inset-x-0 bottom-0 flex-col sm:flex-row justify-between items-center sm:p-5 px-3 pt-3 text-gray bg-white">
        <Paragraph className="overflow-hidden w-full max-w-sm text-center sm:text-left overflow-ellipsis whitespace-nowrap">
          {track.title}
        </Paragraph>
        <AudioPlayerWaveform
          current={transport.current}
          total={transport.total}
          url={track.waveformUrl}
          onSeek={handleSeek}
        />
        <Box>
          {!isPlaying && <AudioPlayerPlay onClick={handleResume} />}
          {isPlaying && <AudioPlayerPause onClick={handlePause} />}
          <AudioPlayerStop onClick={handleStop} />
        </Box>
      </Box>
    )
  );
}

function AudioPlayerWaveform({ url, current, total, onSeek }): JSX.Element {
  const handleClick = ({ target, clientX }) => {
    const rect = target.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    const position = Math.round(percentage * total);
    onSeek(position);
  };

  return (
    <Box
      className="relative sm:flex-grow my-1 sm:mx-5 w-full max-w-3xl h-5 sm:h-20 bg-gray filter contrast-200"
      onClick={handleClick}
    >
      <Box
        className="absolute top-0 bottom-0 left-0 bg-gray-300"
        style={{ width: `${(current / total) * 100}%` }}
      />
      <Box className="absolute inset-0 filter contrast-200">
        <Image className="w-full h-full bg-cover" src={url} />
      </Box>
    </Box>
  );
}

function AudioPlayerPlay({ onClick }): JSX.Element {
  return (
    <button onClick={onClick}>
      <svg
        className="w-7 sm:w-8"
        viewBox="0 0 1200 1200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416zM384 288l384 224-384 224z" />
      </svg>
    </button>
  );
}

function AudioPlayerPause({ onClick }): JSX.Element {
  return (
    <button onClick={onClick}>
      <svg
        className="w-7 sm:w-8"
        viewBox="0 0 1200 1200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416zM320 320h128v384h-128zM576 320h128v384h-128z" />
      </svg>
    </button>
  );
}

function AudioPlayerStop({ onClick }): JSX.Element {
  return (
    <button onClick={onClick}>
      <svg
        className="w-7 sm:w-8"
        viewBox="0 0 1200 1200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416zM320 320h384v384h-384z" />
      </svg>
    </button>
  );
}
