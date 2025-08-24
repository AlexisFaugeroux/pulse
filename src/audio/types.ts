import type Analyser from '../utils/classes/Analyser';
import type Chorus from '../utils/classes/FXs/Chorus';
import type Compressor from '../utils/classes/FXs/Compressor';
import type Delay from '../utils/classes/FXs/Delay';
import type Filter from '../utils/classes/FXs/Filter';
import type Phaser from '../utils/classes/FXs/Phaser';
import type Reverb from '../utils/classes/FXs/Reverb';
import type LFO from '../utils/classes/LFO';
import type Limiter from '../utils/classes/Limiter';
import type Oscillator from '../utils/classes/Oscillator';
import type Bitcrusher from '../utils/classes/distortion/Bitcrusher';
import type Clipping from '../utils/classes/distortion/Clipping';
import type Noise from '../utils/classes/noises/Noise';

export type AudioNodes = {
  masterGain: GainNode;
  oscAGain: GainNode;
  oscBGain: GainNode;
  subGain: GainNode;
  whiteNoiseGain: GainNode;
  pinkNoiseGain: GainNode;
  brownNoiseGain: GainNode;
  analyser: Analyser;
  bitcrusher: Bitcrusher;
  chorus: Chorus;
  clipping: Clipping;
  compressor: Compressor;
  delay: Delay;
  destination: AudioDestinationNode;
  filter: Filter;
  lfo: LFO;
  limiter: Limiter;
  phaser: Phaser;
  reverb: Reverb;
  activeOscillators: Oscillator[];
  activeNoises: Noise[];
};

export type AudioGraph = {
  ctx: AudioContext;
  nodes: AudioNodes;
};
