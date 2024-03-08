import { InitialSettingsState } from './types/types';
import Analyser from './utils/classes/Analyser';
import Compressor from './utils/classes/Compressor';
import Delay from './utils/classes/Delay';
import BitcrusherDistortion from './utils/classes/distortion/Bitcrusher';
import ClippingDistortion from './utils/classes/distortion/Clipping';
import Filter from './utils/classes/Filter';
import LFO from './utils/classes/LFO';
import Limiter from './utils/classes/Limiter';
import Reverb from './utils/classes/Reverb';
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
  flanger: {
    isActive: false,
    delay: 0.5,
    feedback: 0.5,
    depth: 0.5,
    speed: 0.5,
    dryGain: 1,
    wetGain: 0,
    mixGain: 1,
  },
  chorus: {
    isActive: false,
    delay: 0.5,
    feedback: 0.5,
    depth: 0.5,
    speed: 0.5,
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
export const oscBGain = audioContext.createGain();
export const subGain = audioContext.createGain();

// Filter
export const filter = new Filter(audioContext);

// LFO
export const lfo = new LFO(audioContext);

// Distortion
export const clippingDistortion = new ClippingDistortion(audioContext);
export const bitcrusherDistortion = new BitcrusherDistortion(audioContext);
await bitcrusherDistortion.init();

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
