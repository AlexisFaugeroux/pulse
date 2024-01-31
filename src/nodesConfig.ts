import { InitialSettingsState } from './types/types';

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
    release: 0.015,
  },
  gains: {
    oscAGainValue: 0.7,
    oscBGainValue: 0.7,
    oscLFOGainValue: 0.3,
  },
  lfo: {
    isActive: false,
    type: 'sine',
    frequency: 0,
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
};

// AudioContext
export const audioContext = new AudioContext();

// Output
export const audioContextOutput = audioContext.destination;

// Oscillator
export const oscAGain = audioContext.createGain();
export const oscBGain = audioContext.createGain();

// LFO
export const oscLFOGain = audioContext.createGain();

// Filter
export const filter = audioContext.createBiquadFilter();
export const filterDryGain = audioContext.createGain();
export const filterWetGain = audioContext.createGain();
export const filterMixGain = audioContext.createGain();

filterDryGain.gain.value = initialSettings.filter.dryGain;
filterWetGain.gain.value = initialSettings.filter.wetGain;

// Delay
export const delay = audioContext.createDelay(10); // 10 = maximum delay time allowed
export const feedback = audioContext.createGain();
export const delayDryGain = audioContext.createGain();
export const delayWetGain = audioContext.createGain();
export const delayMixGain = audioContext.createGain();

feedback.gain.value = initialSettings.delay.feedback;
delayDryGain.gain.value = initialSettings.delay.dryGain;
delayWetGain.gain.value = initialSettings.delay.wetGain;

// Master
export const masterGain = audioContext.createGain();
