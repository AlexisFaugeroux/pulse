import { presets } from '../presets/presets';
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
import type { AudioNodes } from "./types";

const { settings } = presets[0];

export function createAudioNodes(audioContext: AudioContext): AudioNodes{
  const masterGain = audioContext.createGain();

  const oscAGain = audioContext.createGain();
  oscAGain.gain.value = settings.oscillators.oscillatorA.gain;
  const oscBGain = audioContext.createGain();
  oscBGain.gain.value = settings.oscillators.oscillatorB.gain;
  const subGain = audioContext.createGain();
  subGain.gain.value = settings.oscillators.subOscillator.gain;

  const whiteNoiseGain = audioContext.createGain();
  whiteNoiseGain.gain.value = settings.noises.whiteNoise.gain * 0.5;
  const pinkNoiseGain = audioContext.createGain();
  pinkNoiseGain.gain.value = settings.noises.pinkNoise.gain * 0.5;
  const brownNoiseGain = audioContext.createGain();
  brownNoiseGain.gain.value = settings.noises.brownNoise.gain * 0.5;

  return {
    masterGain,
    oscAGain,
    oscBGain,
    subGain,
    whiteNoiseGain,
    pinkNoiseGain,
    brownNoiseGain,
    analyser: new Analyser(audioContext),
    bitcrusher: new Bitcrusher(audioContext, settings.distortion),
    chorus: new Chorus(audioContext, settings.chorus),
    clipping: new Clipping(audioContext, settings.distortion),
    compressor: new Compressor(audioContext),
    delay: new Delay(audioContext, settings.delay),
    destination: audioContext.destination,
    filter: new Filter(audioContext),
    lfo: new LFO(audioContext, settings.lfo),
    limiter: new Limiter(audioContext),
    phaser: new Phaser(audioContext, settings.phaser),
    reverb: new Reverb(audioContext, settings.reverb),
  };
}
