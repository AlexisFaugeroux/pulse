import { InitialSettingsState } from './types/types';

// Ajouter une propriété parent à la classe Oscillator
// pour identifier le parent de l'oscillator
// se servir de cette info pour fitler les osc actifs
// et ajuster le detune en temps réel

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
      id: 'oscillatorA',
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
      id: 'oscillatorB',
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
