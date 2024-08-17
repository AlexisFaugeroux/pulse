import { InitialSettingsState } from './types/types';
import Analyser from './utils/classes/Analyser';
import Chorus from './utils/classes/FXs/Chorus';
import Compressor from './utils/classes/FXs/Compressor';
import Delay from './utils/classes/FXs/Delay';
import Filter from './utils/classes/FXs/Filter';
import Phaser from './utils/classes/FXs/Phaser';
import Reverb from './utils/classes/FXs/Reverb';
import LFO from './utils/classes/LFO';
import Limiter from './utils/classes/Limiter';
import BitcrusherDistortion from './utils/classes/distortion/Bitcrusher';
import ClippingDistortion from './utils/classes/distortion/Clipping';
import { DistortionType, LFOMode } from './utils/constants';

export const initialSettings: InitialSettingsState = {
  oscillators: {
    oscillatorA: {
      id: 'oscillatorA',
      isActive: true,
      type: 'sine',
      octaveOffset: 0,
      detune: 0,
      gain: 0.3,
    },
    oscillatorB: {
      id: 'oscillatorB',
      isActive: false,
      type: 'sine',
      octaveOffset: 0,
      detune: 0,
      gain: 0.3,
    },
    subOscillator: {
      id: 'subOscillator',
      isActive: false,
      type: 'sine',
      octaveOffset: 0,
      gain: 0.3,
    },
  },
  noises: {
    whiteNoise: {
      id: 'whiteNoise',
      isActive: false,
      gain: 0.3,
    },
    pinkNoise: {
      id: 'pinkNoise',
      isActive: false,
      gain: 0.3,
    },
    brownNoise: {
      id: 'brownNoise',
      isActive: false,
      gain: 0.3,
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
    mode: LFOMode.TREMOLO,
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
  distortion: {
    isActive: false,
    clipping: {
      isActive: false,
      type: DistortionType.SOFT,
      drive: 0.25,
      dryGain: 1,
      wetGain: 0,
      mixGain: 1,
    },
    bitcrusher: {
      isActive: false,
      type: DistortionType.BITCRUSHER,
      bitDepth: 0,
      downsampling: 0.5,
      dryGain: 1,
      wetGain: 0,
      mixGain: 1,
    },
  },
  phaser: {
    isActive: false,
    baseFrequency: 0.58,
    frequencyOffset: 0.2,
    q: 0.1,
    stereoPhase: 0.4,
    depth: 0.5,
    rate: 0.3,
    dryGain: 1,
    wetGain: 0,
    mixGain: 1,
  },
  chorus: {
    isActive: false,
    time: 0.35,
    feedback: 0.4,
    depth: 0.1,
    rate: 0.2,
    stereoPhase: 0.5,
    dryGain: 1,
    wetGain: 0,
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
  compressor: {
    isActive: false,
    threshold: 0.76,
    knee: 0.3,
    ratio: 0.58,
    attack: 0.1,
    release: 0.25,
    dryGain: 1,
    wetGain: 0,
    mixGain: 1,
  },
  master: {
    gain: 0.3,
  },
};

// AudioContext
export const audioContext = new AudioContext();

// Output
export const audioContextOutput = audioContext.destination;

// Master
export const masterGain = audioContext.createGain();

// Oscillators
export const oscAGain = audioContext.createGain();
oscAGain.gain.value = initialSettings.oscillators.oscillatorA.gain;
export const oscBGain = audioContext.createGain();
oscBGain.gain.value = initialSettings.oscillators.oscillatorB.gain;
export const subGain = audioContext.createGain();
subGain.gain.value = initialSettings.oscillators.subOscillator.gain;

// Noises
export const whiteNoiseGain = audioContext.createGain();
whiteNoiseGain.gain.value = initialSettings.noises.whiteNoise.gain;
export const pinkNoiseGain = audioContext.createGain();
pinkNoiseGain.gain.value = initialSettings.noises.pinkNoise.gain;
export const brownNoiseGain = audioContext.createGain();
brownNoiseGain.gain.value = initialSettings.noises.brownNoise.gain;

// Filter
export const filter = new Filter(audioContext);

// LFO
export const lfo = new LFO(audioContext);

// Distortion
export const clippingDistortion = new ClippingDistortion(audioContext);
export const bitcrusherDistortion = new BitcrusherDistortion(audioContext);
await bitcrusherDistortion.init();

// Chorus
export const chorus = new Chorus(audioContext);

// Phaser
export const phaser = new Phaser(audioContext);

// Delay
export const delay = new Delay(audioContext);

// Reverb
export const reverb = new Reverb(audioContext);

// Compressor
export const compressor = new Compressor(audioContext);

// Limiter
export const limiter = new Limiter(audioContext);

// Analyzer
export const analyser = new Analyser(audioContext);
