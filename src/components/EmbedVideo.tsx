import React, { useState } from 'react';
import ReactPlayerVimeo from 'react-player/vimeo';
import ReactPlayerYouTube from 'react-player/youtube';

import Image from '~/components/Image';
import Modal from '~/components/Modal';
import { useVideo } from '~/hooks/video';

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
          <div onClick={handleOpen}>
            <EmbedVideoPreview thumbnailUrl={thumbnailUrl} title={videoTitle} />
          </div>
        </>
      )}
    </>
  );
}

function EmbedVideoPreview({ thumbnailUrl, title }): JSX.Element {
  return (
    <>
      <Image src={thumbnailUrl} />
      <p>{title}</p>
    </>
  );
}

function EmbedVideoFullscreen({ isOpen, url, onClose }): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {url.includes('youtube') ? (
        <ReactPlayerYouTube url={url} />
      ) : (
        <ReactPlayerVimeo url={url} />
      )}
    </Modal>
  );
}
