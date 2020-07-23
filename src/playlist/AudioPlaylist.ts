import { PlaylistPropType } from './types';
import EventEmitter from '../EventEmitter';
import StateManager from '../StateManager';
import playAudio from './playAudio';

const AudioPlaylist = ({ files, volume }: PlaylistPropType) => {
  const emmiter = EventEmitter();
  const state = StateManager();
  state.set('volume', volume);
  const _playAudio = playAudio(state, emmiter);

  return {
    play() {
      const audio = state.get('audio');

      if (!audio || state.get('isStopped')) {
        _playAudio(0, files);
        state.set('isStopped', false);
        return;
      }

      audio.play();
    },

    pause() {
      state.get('audio')?.pause();
    },

    stop() {
      state.set('isStopped', true);
      state.get('audio')?.stop();
    },

    on(
      eventType: 'start' | 'end',
      callback: (param: { [data: string]: any }) => void
    ) {
      emmiter.listener(eventType, callback);
    },

    get volume() {
      return state.get('volume');
    },

    set volume(newVolume: number) {
      state.set('volume', newVolume);
      state.get('audio').volume = newVolume;
    },
  };
};

export default AudioPlaylist;
