import clsx from 'clsx';
import React, { useState } from 'react';
import ReactPlayerVimeo from 'react-player/vimeo';
import ReactPlayerYouTube from 'react-player/youtube';

import { useVideo } from '~/hooks';
import { useTrackedAudioPlayer } from '~/state';

import Box from '~/components/Box';
import IconPlay from '~/components/IconPlay';
import Image from '~/components/Image';
import Modal from '~/components/Modal';
import Paragraph from '~/components/Paragraph';

type Props = {
  url: string;
  caption?: string;
  className?: string;
};

export default function EmbedVideo({
  url,
  caption,
  className,
}: Props): JSX.Element {
  const [, dispatch] = useTrackedAudioPlayer();
  const { thumbnailUrl, isLoading, isError, title } = useVideo(url);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoTitle = caption || title;

  const handleOpen = () => {
    // Stop audio before showing video
    dispatch({ type: 'stop' });

    // Show fullscreen video
    setIsFullscreen(true);
  };

  const handleClose = () => {
    setIsFullscreen(false);
  };

  if (isLoading || isError) {
    return null;
  }

  return (
    <>
      <EmbedVideoFullscreen
        isOpen={isFullscreen}
        url={url}
        onClose={handleClose}
      />
      <Box
        className={clsx(
          'group relative my-8 md:my-16 h-80 cursor-pointer',
          className,
        )}
        onClick={handleOpen}
      >
        <EmbedVideoPreview thumbnailUrl={thumbnailUrl} />
        <Box className="flex absolute right-0 bottom-0 left-0 items-center p-3 md:p-5 group-hover:opacity-90">
          <IconPlay className="w-6 md:w-7" />
          <Paragraph className="pb-1 pl-2 w-full group-hover:underline ellipsis">
            {videoTitle}
          </Paragraph>
        </Box>
      </Box>
    </>
  );
}

function EmbedVideoPreview({ thumbnailUrl }): JSX.Element {
  return <Image className="object-cover w-full h-full" src={thumbnailUrl} />;
}

function EmbedVideoFullscreen({ isOpen, url, onClose }): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {url.includes('youtube') ? (
        <ReactPlayerYouTube
          className="aspect-w-16 aspect-h-9"
          config={{
            playerVars: { modestbranding: 1, controls: 1, autoplay: 1, rel: 0 },
          }}
          height="100%"
          url={url}
          width="100%"
        />
      ) : (
        <ReactPlayerVimeo
          className="aspect-w-16 aspect-h-9"
          config={{
            playerOptions: {
              responsive: true,
              autoplay: true,
            },
          }}
          height="100%"
          url={url}
          width="100%"
        />
      )}
    </Modal>
  );
}
