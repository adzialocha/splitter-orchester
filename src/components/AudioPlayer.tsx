import React, { useEffect } from 'react';
import SoundCloudAudio from 'soundcloud-audio';

import Image from '~/components/Image';
import { useAudioPlayerState } from '~/store/audio';

const CLIENT_ID = 'b8a71a1bbc08a31096a72300e47f4569';

let audioPlayer;

export default function AudioPlayer(): JSX.Element {
  const [audioState, dispatch] = useAudioPlayerState();
  const { url, isPlaying, waveformUrl } = audioState;

  const handlePause = () => {
    dispatch({ type: 'pause' });
  };

  const handleResume = () => {
    dispatch({ type: 'resume' });
  };

  const handleStop = () => {
    dispatch({ type: 'stop' });
  };

  return (
    <>
      <AudioPlayerSoundcloud url={url} isPlaying={isPlaying} />
      {url && (
        <>
          <AudioPlayerWaveform waveformUrl={waveformUrl} />
          {!isPlaying && <button onClick={handleResume}>Resume</button>}
          {isPlaying && <button onClick={handlePause}>Pause</button>}
          <button onClick={handleStop}>Stop</button>
        </>
      )}
    </>
  );
}

function AudioPlayerWaveform({ waveformUrl }): JSX.Element {
  return <Image src={waveformUrl} />;
}

function AudioPlayerSoundcloud({ url, isPlaying }): JSX.Element {
  const [, dispatch] = useAudioPlayerState();

  useEffect(() => {
    if (!audioPlayer) {
      audioPlayer = new SoundCloudAudio(CLIENT_ID);

      audioPlayer.on('timeupdate', () => {
        dispatch({
          type: 'updateTime',
          timeCurrent: audioPlayer.audio.currentTime,
          timeDuration: audioPlayer.audio.duration,
        });
      });

      audioPlayer.on('ended', () => {
        dispatch({ type: 'pause' });
      });
    }

    if (!url) {
      audioPlayer.stop();
      return;
    }

    if (isPlaying) {
      audioPlayer.resolve(url, (track) => {
        dispatch({
          type: 'updateTrack',
          title: track.title,
          waveformUrl: track.waveform_url,
        });

        audioPlayer.play();
      });
    } else {
      audioPlayer.pause();
    }
  }, [isPlaying, url]);

  return null;
}
