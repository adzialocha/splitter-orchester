import Link from 'next/link';
import React from 'react';

import { useTrackedAudioPlayer } from '~/state';

import Box from '~/components/Box';
import Image from '~/components/Image';
import Paragraph from '~/components/Paragraph';

export default function AudioPlayer(): JSX.Element {
  const [audioState, dispatch] = useTrackedAudioPlayer();
  const { url, isPlaying, transport, track, info } = audioState;

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
      <AudioPlayerContainer>
        <AudioPlayerTitle subtitle={info.caption} title={track.title} />
        <AudioPlayerWaveform
          current={transport.current}
          total={transport.total}
          url={track.waveformUrl}
          onSeek={handleSeek}
        />
        <AudioPlayerTransport
          isPlaying={isPlaying}
          slug={info.slug}
          onPause={handlePause}
          onPlay={handleResume}
          onStop={handleStop}
        />
      </AudioPlayerContainer>
    )
  );
}

function AudioPlayerContainer({ children }): JSX.Element {
  return (
    <Box className="flex fixed inset-x-0 bottom-0 flex-col sm:flex-row justify-between items-center sm:p-4 py-3 px-3 text-gray bg-white">
      {children}
    </Box>
  );
}

function AudioPlayerTitle({ title, subtitle }): JSX.Element {
  return (
    <Box className="overflow-hidden flex-shrink w-full md:max-w-xs text-center sm:text-left">
      <Paragraph className="overflow-hidden w-full overflow-ellipsis whitespace-nowrap">
        <strong>{title}</strong>
      </Paragraph>
      {subtitle && (
        <Paragraph className="hidden md:block overflow-hidden w-full overflow-ellipsis whitespace-nowrap">
          {subtitle}
        </Paragraph>
      )}
    </Box>
  );
}

function AudioPlayerWaveform({ url, current, total, onSeek }): JSX.Element {
  // Calculate position in track
  const handleClick = ({ target, clientX }) => {
    const rect = target.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    const position = Math.round(percentage * total);
    onSeek(position);
  };

  const width = (current / total) * 100;

  return (
    <Box
      className="relative sm:flex-grow my-1 sm:mx-5 w-full max-w-3xl h-5 sm:h-10 bg-gray filter contrast-200 cursor-pointer"
      onClick={handleClick}
    >
      <Box
        className="absolute top-0 bottom-0 left-0 bg-gray-300"
        style={{ width: `${width}%` }}
      />
      <Box className="absolute inset-0 filter contrast-200">
        <Image className="w-full h-full bg-cover" src={url} />
      </Box>
    </Box>
  );
}

function AudioPlayerTransport({
  slug,
  isPlaying,
  onPlay,
  onPause,
  onStop,
}): JSX.Element {
  return (
    <Box className="flex items-center">
      {slug && <AudioPlayerMore slug={slug} />}
      {!isPlaying && <AudioPlayerPlay onClick={onPlay} />}
      {isPlaying && <AudioPlayerPause onClick={onPause} />}
      <AudioPlayerStop onClick={onStop} />
    </Box>
  );
}

function AudioPlayerButton({ onClick, path }): JSX.Element {
  return (
    <button className="mt-1" onClick={onClick}>
      <svg
        className="w-6 sm:w-8"
        viewBox="0 0 1200 1200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 ${path}`}
        />
      </svg>
    </button>
  );
}

function AudioPlayerPlay({ onClick }): JSX.Element {
  return (
    <AudioPlayerButton path="416zM384 288l384 224-384 224z" onClick={onClick} />
  );
}

function AudioPlayerPause({ onClick }): JSX.Element {
  return (
    <AudioPlayerButton
      path="416zM320 320h128v384h-128zM576 320h128v384h-128z"
      onClick={onClick}
    />
  );
}

function AudioPlayerStop({ onClick }): JSX.Element {
  return (
    <AudioPlayerButton path="416zM320 320h384v384h-384z" onClick={onClick} />
  );
}

function AudioPlayerMore({ slug }): JSX.Element {
  return (
    <Link href={`/${slug}`}>
      <a className="mx-5 underline whitespace-nowrap">Read more</a>
    </Link>
  );
}
