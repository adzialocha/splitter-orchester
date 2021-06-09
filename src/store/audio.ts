import { Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
  isPlaying: false,
  url: '',
  timeCurrent: 0,
  timeDuration: 0,
  title: '',
  waveformUrl: '',
};

type State = typeof initialState;

type Action =
  | { type: 'updateTime'; timeCurrent: number; timeDuration: number }
  | { type: 'updateTrack'; title: string; waveformUrl: string }
  | { type: 'play'; url: string }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'stop' };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'play':
      return {
        ...state,
        isPlaying: true,
        url: action.url,
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
    case 'updateTime':
      return {
        ...state,
        timeCurrent: action.timeCurrent,
        timeDuration: action.timeDuration,
      };
    case 'updateTrack':
      return {
        ...state,
        title: action.title,
        waveformUrl: action.waveformUrl,
      };
    default:
      throw new Error('Unknown action type');
  }
};

const useValue = () => useReducer(reducer, initialState);

const { Provider, useTracked } = createContainer(useValue, true);

export const AudioPlayerProvider = Provider;
export const useAudioPlayerState = useTracked;
