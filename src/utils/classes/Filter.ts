import { FXs } from '../constants';
import FX from './FX';

export default class Filter extends FX {
  constructor(public audioContext: AudioContext) {
    super(audioContext, FXs.FILTER);
    this.node = audioContext.createBiquadFilter();
    this.dryGain.gain.value;

    this.wireUp(this.node);
  }
  node: BiquadFilterNode;
}
