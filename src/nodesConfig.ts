import { InitialSettingsState } from './types/types';
import Delay from './utils/classes/Delay';
import Filter from './utils/classes/Filter';
import Reverb from './utils/classes/Reverb';

export const initialSettings: InitialSettingsState = {
  oscillators: {
    oscillatorA: {
      id: 'oscillatorA',
      isActive: true,
      type: 'sine',
      octaveOffset: 0,
      detune: 0,
      gain: 0.7,
    },
    oscillatorB: {
      id: 'oscillatorB',
      isActive: false,
      type: 'sine',
      octaveOffset: 0,
      detune: 0,
      gain: 0.7,
    },
  },
  envelope: {
    isActive: true,
    attack: 0.005,
    decay: 0.2,
    sustain: 1,
    release: 0.015,
  },
  lfo: {
    isActive: false,
    type: 'sine',
    frequency: 0,
    gain: 0.3,
  },
  filter: {
    isActive: false,
    type: 'lowpass',
    frequency: 0.5,
    gain: 0.5,
    Q: 0.001,
    dryGain: 1,
    wetGain: 1,
    mixGain: 1,
  },
  delay: {
    isActive: false,
    time: 0.4,
    feedback: 0.3,
    dryGain: 1,
    wetGain: 0,
    mixGain: 1,
  },
  reverb: {
    isActive: false,
    time: 0.4,
    decay: 0.3,
    dryGain: 1,
    wetGain: 0,
    mixGain: 1,
  },
  master: {
    gain: 0.6,
  },
};

// AudioContext
export const audioContext = new AudioContext();

// Output
export const audioContextOutput = audioContext.destination;

// Master
export const masterGain = audioContext.createGain();

// Oscillator
export const oscAGain = audioContext.createGain();
export const oscBGain = audioContext.createGain();

// LFO
export const oscLFOGain = audioContext.createGain();

// Filter
export const filter = new Filter(audioContext);

// Delay
export const delay = new Delay(audioContext);

// Reverb
export const reverb = new Reverb(audioContext);
