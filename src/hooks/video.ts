import { useEffect, useState } from 'react';

interface VideoThumbnailData {
  html?: string;
  isError: boolean;
  thumbnailUrl?: string;
  title?: string;
}

interface VideoThumbnail extends VideoThumbnailData {
  isLoading: boolean;
}

type Cache = {
  [thumbnailUrl: string]: VideoThumbnailData;
};

const cache: Cache = {};

export function useVideo(url: string): VideoThumbnail {
  const [video, setVideo] = useState<VideoThumbnailData>({
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const data = await window.fetch(`http://noembed.com/embed?url=${url}`);
        const result = await data.json();

        // Handle errors from noembed service
        if (result.error) {
          throw new Error(result.error);
        }

        // Make sure thumbnail URL supports https
        const resultUrl = result.thumbnail_url.replace(
          /^http:\/\//i,
          'https://',
        );

        // Store result in cache for the future
        cache[url] = {
          isError: false,
          thumbnailUrl: resultUrl,
          html: result.html,
          title: result.title,
        };
      } catch {
        cache[url] = {
          isError: true,
        };
      } finally {
        setVideo(cache[url]);
        setIsLoading(false);
      }
    };

    if (url in cache) {
      setVideo(cache[url]);
      setIsLoading(false);
    } else {
      setVideo(cache[url]);
      setIsLoading(true);

      fetchThumbnail();
    }
  }, [url]);

  return {
    ...video,
    isLoading,
  };
}
