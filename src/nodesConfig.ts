import { presets } from './presets/presets';
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

// Get default preset for initialisation
const { settings } = presets[0];

// AudioContext
export const audioContext = new AudioContext();

// Output
export const audioContextOutput = audioContext.destination;

// Master
export const masterGain = audioContext.createGain();

// Oscillators
export const oscAGain = audioContext.createGain();
oscAGain.gain.value = settings.oscillators.oscillatorA.gain;
export const oscBGain = audioContext.createGain();
oscBGain.gain.value = settings.oscillators.oscillatorB.gain;
export const subGain = audioContext.createGain();
subGain.gain.value = settings.oscillators.subOscillator.gain;

// Noises
export const whiteNoiseGain = audioContext.createGain();
whiteNoiseGain.gain.value = settings.noises.whiteNoise.gain;
export const pinkNoiseGain = audioContext.createGain();
pinkNoiseGain.gain.value = settings.noises.pinkNoise.gain;
export const brownNoiseGain = audioContext.createGain();
brownNoiseGain.gain.value = settings.noises.brownNoise.gain;

// Filter
export const filter = new Filter(audioContext);

// LFO
export const lfo = new LFO(audioContext, settings.lfo);

// Distortion
export const clippingDistortion = new ClippingDistortion(
  audioContext,
  settings.distortion,
);
export const bitcrusherDistortion = new BitcrusherDistortion(
  audioContext,
  settings.distortion,
);
await bitcrusherDistortion.init();

// Chorus
export const chorus = new Chorus(audioContext, settings.chorus);

// Phaser
export const phaser = new Phaser(audioContext, settings.phaser);

// Delay
export const delay = new Delay(audioContext, settings.delay);

// Reverb
export const reverb = new Reverb(audioContext, settings.reverb);

// Compressor
export const compressor = new Compressor(audioContext);

// Limiter
export const limiter = new Limiter(audioContext);

// Analyzer
export const analyser = new Analyser(audioContext);
