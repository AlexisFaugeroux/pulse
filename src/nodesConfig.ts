import { InitialSettingsState } from './types/types';

export const audioContext = new AudioContext();
export const audioContextOutput = audioContext.destination;

export const oscAGain = audioContext.createGain();
export const oscBGain = audioContext.createGain();
export const masterGain = audioContext.createGain();

oscAGain.connect(masterGain);
oscBGain.connect(masterGain);
masterGain.connect(audioContextOutput);

export const initialSettings: InitialSettingsState = {
  oscillators: {
    oscillatorA: {
      isActive: true,
      type: 'sine',
      detune: 0,
      adsr: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.6,
        release: 0.1,
      },
    },
    oscillatorB: {
      isActive: false,
      type: 'sine',
      detune: 0,
      adsr: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.6,
        release: 0.1,
      },
    },
  },
  gains: {
    oscAGainValue: 0.7,
    oscBGainValue: 0.7,
  },
};
