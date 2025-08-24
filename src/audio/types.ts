import Analyser from '../utils/classes/Analyser';
import Chorus from '../utils/classes/FXs/Chorus';
import Compressor from '../utils/classes/FXs/Compressor';
import Delay from '../utils/classes/FXs/Delay';
import Filter from '../utils/classes/FXs/Filter';
import Phaser from '../utils/classes/FXs/Phaser';
import Reverb from '../utils/classes/FXs/Reverb';
import LFO from '../utils/classes/LFO';
import Limiter from '../utils/classes/Limiter';
import Bitcrusher from '../utils/classes/distortion/Bitcrusher';
import Clipping from '../utils/classes/distortion/Clipping';

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
};

export type AudioGraph = {
  ctx: AudioContext;
  nodes: AudioNodes;
};
