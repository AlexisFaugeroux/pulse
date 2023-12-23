import { InitialSettingsState } from './types/types';

export const audioContext = new AudioContext();
export const audioContextOutput = audioContext.destination;

export const oscAGain = audioContext.createGain();
export const oscBGain = audioContext.createGain();
export const filter = audioContext.createBiquadFilter();
export const masterGain = audioContext.createGain();

oscAGain.connect(filter);
oscBGain.connect(filter);
filter.connect(masterGain);
masterGain.connect(audioContextOutput);

export const initialSettings: InitialSettingsState = {
  oscillators: {
    oscillatorA: {
      id: 'oscillatorA',
      isActive: true,
      type: 'sine',
      octaveOffset: 0,
      detune: 0,
    },
    oscillatorB: {
      id: 'oscillatorB',
      isActive: false,
      type: 'sine',
      octaveOffset: 0,
      detune: 0,
    },
  },
  envelope: {
    isActive: true,
    attack: 0.005,
    decay: 1,
    sustain: 1,
    release: 0.1,
  },
  gains: {
    oscAGainValue: 0.7,
    oscBGainValue: 0.7,
  },
  filter: {
    isActive: false,
    type: 'lowpass',
    frequency: 0.5,
    gain: 0.5,
    Q: 0.001,
  },
};
