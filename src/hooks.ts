import { useEffect, useState } from 'react';

interface VideoThumbnailData {
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

// Get data like `thumbnailUrl` and `title` from YouTube or Vimeo URLs
export function useVideo(url: string): VideoThumbnail {
  // Keep the unmounted state her to avoid any race conditions where the result
  // arrives after the component got removed
  let isUnmounted = false;

  const [video, setVideo] = useState<VideoThumbnailData>({
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isUnmounted = false;

    const fetchThumbnail = async () => {
      try {
        const data = await window.fetch(`https://noembed.com/embed?url=${url}`);
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
          title: result.title,
        };
      } catch {
        cache[url] = {
          isError: true,
        };
      } finally {
        if (!isUnmounted) {
          setVideo(cache[url]);
          setIsLoading(false);
        }
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

    return () => {
      isUnmounted = true;
    };
  }, [url]);

  return {
    ...video,
    isLoading,
  };
}
