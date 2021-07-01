import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { useTrackedAudioPlayer } from '~/state';

import Box from '~/components/Box';
import IconPause from '~/components/IconPause';
import IconPlay from '~/components/IconPlay';
import IconStop from '~/components/IconStop';
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
    <Box className="flex fixed inset-x-0 bottom-0 flex-col md:flex-row justify-between items-center md:p-4 py-3 px-3 text-gray bg-white">
      {children}
    </Box>
  );
}

function AudioPlayerTitle({ title, subtitle }): JSX.Element {
  return (
    <Box className="overflow-hidden flex-shrink w-full md:max-w-xs text-center md:text-left">
      <Paragraph className="w-full ellipsis">
        <strong>{title ? title : 'Loading ...'}</strong>
      </Paragraph>
      {title && subtitle && (
        <Paragraph className="hidden md:block w-full ellipsis">
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
      className={clsx(
        'relative md:flex-grow my-1 md:mx-5 w-full max-w-3xl h-5 md:h-12 cursor-pointer',
        {
          'bg-gray filter-contrast-200': !!url,
        },
      )}
      onClick={handleClick}
    >
      {url && (
        <>
          <Box
            className="absolute top-0 bottom-0 left-0 bg-gray-300"
            style={{ width: `${width}%` }}
          />
          <Box className="absolute inset-0 filter contrast-200">
            <Image className="w-full h-full bg-cover" src={url} />
          </Box>
        </>
      )}
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

function AudioPlayerButton({ icon: IconComponent, onClick }): JSX.Element {
  return (
    <button className="mt-1" onClick={onClick}>
      <IconComponent className="w-6 md:w-8" isInverted />
    </button>
  );
}

function AudioPlayerPlay({ onClick }): JSX.Element {
  return <AudioPlayerButton icon={IconPlay} onClick={onClick} />;
}

function AudioPlayerPause({ onClick }): JSX.Element {
  return <AudioPlayerButton icon={IconPause} onClick={onClick} />;
}

function AudioPlayerStop({ onClick }): JSX.Element {
  return <AudioPlayerButton icon={IconStop} onClick={onClick} />;
}

function AudioPlayerMore({ slug }): JSX.Element {
  return (
    <Link href={`/${slug}`}>
      <a className="mx-5 underline whitespace-nowrap">Read more</a>
    </Link>
  );
}
