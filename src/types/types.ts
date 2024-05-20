import { DistortionType, LFOMode } from '../utils/constants';

export type OscSettings = {
  id: 'oscillatorA' | 'oscillatorB';
  isActive: boolean;
  type: OscillatorType;
  octaveOffset: number;
  detune: number;
  gain: number;
};

export type SubOscSettings = {
  id: string;
  isActive: boolean;
  type: OscillatorType;
  octaveOffset: number;
  gain: number;
};

export type NoiseSettings = {
  id: string;
  isActive: boolean;
  gain: number;
};

export type EnvelopeSettings = {
  [key: string]: boolean | number;
  isActive: boolean;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

type BaseFxSettings = {
  isActive: boolean;
  dryGain: number;
  wetGain: number;
  mixGain: number;
};

export type FilterSettings = BaseFxSettings & {
  frequency: number;
  gain: number;
  Q: number;
  type: BiquadFilterType;
};

export type DistortionSettings = {
  isActive: boolean;
  clipping: BaseFxSettings & {
    type: DistortionType;
    drive: number;
  };
  bitcrusher: BaseFxSettings & {
    type: DistortionType.BITCRUSHER;
    bitDepth: number;
    downsampling: number;
  };
};

export type FlangerSettings = BaseFxSettings & {
  delay: number;
  feedback: number;
  depth: number;
  speed: number;
};

export type ChorusSettings = BaseFxSettings & {
  delay: number;
  feedback: number;
  depth: number;
  speed: number;
};

export type DelaySettings = BaseFxSettings & {
  time: number;
  feedback: number;
};

export type ReverbSettings = BaseFxSettings & {
  time: number;
  decay: number;
};

export type CompressorSettings = BaseFxSettings & {
  threshold: number;
  knee: number;
  ratio: number;
  attack: number;
  release: number;
};

export type InitialSettingsState = {
  oscillators: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
    subOscillator: SubOscSettings;
  };
  noises: {
    [key: string]: NoiseSettings;
    whiteNoise: NoiseSettings;
    pinkNoise: NoiseSettings;
    brownNoise: NoiseSettings;
  };
  envelope: EnvelopeSettings;
  lfo: {
    isActive: boolean;
    mode: LFOMode;
    type: OscillatorType;
    frequency: number;
    gain: number;
  };
  filter: FilterSettings;
  distortion: DistortionSettings;
  flanger: FlangerSettings;
  chorus: ChorusSettings;
  delay: DelaySettings;
  reverb: ReverbSettings;
  compressor: CompressorSettings;
  master: {
    gain: number;
  };
};
