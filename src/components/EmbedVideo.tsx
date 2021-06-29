import React, { useState } from 'react';
import ReactPlayerVimeo from 'react-player/vimeo';
import ReactPlayerYouTube from 'react-player/youtube';

import { useVideo } from '~/hooks';

import Box from '~/components/Box';
import Image from '~/components/Image';
import Modal from '~/components/Modal';
import Paragraph from '~/components/Paragraph';

type Props = {
  url: string;
  caption?: string;
};

export default function EmbedVideo({ url, caption }: Props): JSX.Element {
  const { thumbnailUrl, isLoading, isError, title } = useVideo(url);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoTitle = caption || title;

  const handleOpen = () => {
    setIsFullscreen(true);
  };

  const handleClose = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading ..</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <>
          <EmbedVideoFullscreen
            isOpen={isFullscreen}
            url={url}
            onClose={handleClose}
          />
          <Box
            className="group relative my-5 w-full h-80 cursor-pointer"
            onClick={handleOpen}
          >
            <EmbedVideoPreview thumbnailUrl={thumbnailUrl} />
            <Box className="flex absolute right-0 bottom-0 left-0 items-center p-5 group-hover:opacity-90">
              <EmbedVideoPlayIcon />
              <Paragraph className="pb-1 pl-2 w-full group-hover:underline ellipsis text-shadow">
                {videoTitle}
              </Paragraph>
            </Box>
          </Box>
        </>
      )}
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
          height="100%"
          url={url}
          width="100%"
        />
      )}
    </Modal>
  );
}

function EmbedVideoPlayIcon(): JSX.Element {
  return (
    <svg
      className="w-12 sm:w-12"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416zM384 288l384 224-384 224z"
        fill="white"
      />
    </svg>
  );
}
