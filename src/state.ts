import { Reducer, useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import SoundCloudAudio from 'soundcloud-audio';

import type { Dispatch } from 'react';

// Soundcloud Developer API Client ID
const CLIENT_ID = 'b8a71a1bbc08a31096a72300e47f4569';

const initialState = {
  // Is true when user pressed the `Play` button
  isPlaying: false,

  // SoundCloud URL to the current track
  url: '',

  // Resolved data of current track
  track: {
    title: '',
    waveformUrl: '',
  },

  // Current player transport status
  transport: {
    total: 0,
    current: 0,
  },
};

type Track = typeof initialState.track;

type Transport = typeof initialState.transport;

type State = {
  isPlaying: boolean;
  url: string;
  track: Track;
  transport: Transport;
};

type Action =
  | { type: 'play'; url: string }
  | { type: 'seek'; position: number }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'stop' }
  | { type: 'resolve'; track: Track; duration: number }
  | { type: 'transport'; current: number };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'play':
      return {
        ...state,
        isPlaying: true,
        url: action.url,
      };
    case 'seek':
      return {
        ...state,
        transport: {
          ...state.transport,
          current: action.position,
        },
      };
    case 'stop':
      return {
        ...state,
        isPlaying: false,
        url: '',
      };
    case 'pause':
      return {
        ...state,
        isPlaying: false,
      };
    case 'resume':
      return {
        ...state,
        isPlaying: true,
      };
    case 'resolve':
      return {
        ...state,
        track: action.track,
        transport: {
          ...state.transport,
          total: action.duration,
        },
      };
    case 'transport':
      return {
        ...state,
        transport: {
          ...state.transport,
          current: action.current,
        },
      };
    default:
      throw new Error('Unknown action type');
  }
};

// Helper hook to inject a middleware layer before the reducer
const useReducerWithMiddleware = (
  reducer,
  initialState,
  middleware,
): [State, Dispatch<Action>] => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState,
  );

  const dispatchUsingMiddleware = (action) => {
    middleware(action);
    dispatch(action);
  };

  return [state, dispatchUsingMiddleware];
};

// Keep SoundcloudAudioPlayer instance here
let audioPlayer;

const useAudioPlayer = (): [State, Dispatch<Action>] => {
  const initializePlayer = () => {
    // Only initialize player once
    if (audioPlayer) {
      return;
    }

    // Create an instance of the player
    audioPlayer = new SoundCloudAudio(CLIENT_ID);

    // Register a couple of audio events so we can update the state accordingly
    // when things change
    audioPlayer.on('timeupdate', handleTrackUpdate);
    audioPlayer.on('ended', handleTrackEnded);
  };

  const handleDispatch = ({ type, ...action }) => {
    if (type === 'play') {
      // Resolve the data first before we can move on
      audioPlayer.resolve(action.url, (track) => {
        audioPlayer.play({ streamUrl: track.streamUrl });

        // Store track data for UI
        dispatch({
          type: 'resolve',
          track: {
            title: track.title,
            waveformUrl: track.waveform_url,
          },
          duration: Math.floor(track.duration / 1000),
        });
      });
    } else if (type === 'seek') {
      audioPlayer.audio.currentTime = action.position;
    } else if (type === 'pause') {
      audioPlayer.pause();
    } else if (type === 'resume') {
      audioPlayer.play();
    } else if (type === 'stop') {
      audioPlayer.stop();
    }
  };

  const handleTrackUpdate = () => {
    dispatch({
      type: 'transport',
      current: Math.floor(audioPlayer.audio.currentTime),
    });
  };

  const handleTrackEnded = () => {
    audioPlayer.audio.currentTime = 0;

    dispatch({
      type: 'pause',
    });
  };

  // Create reducer with middleware to change audio player state based in
  // incoming actions
  const [state, dispatch] = useReducerWithMiddleware(
    reducer,
    initialState,
    handleDispatch,
  );

  useEffect(() => {
    initializePlayer();
  }, []);

  return [state, dispatch];
};

export const {
  Provider: AudioPlayerProvider,
  useTracked: useTrackedAudioPlayer,
} = createContainer(useAudioPlayer);