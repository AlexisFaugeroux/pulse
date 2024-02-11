import { FXs, TIME_CONSTANT } from '../constants';
import {
  linearToLinearRange,
  linearToLogarithmRange,
  roundTwoDigitsNonFinite,
} from '../helpers';
import FX from './FX';

export default class Filter extends FX {
  node: BiquadFilterNode;

  constructor(public audioContext: AudioContext) {
    super(audioContext, FXs.FILTER);
    this.node = audioContext.createBiquadFilter();
    this.dryGain.gain.value;

    this.wireUp(this.node);
  }

  setType(type: BiquadFilterType) {
    this.node.type = type;
  }

  setFrequency(value: number) {
    const convertedValue = linearToLogarithmRange({
      base: 20,
      value: value,
      linearRange: [0, 1],
      logarithmicRange: [20, 20000],
    });

    this.node.frequency.setTargetAtTime(
      roundTwoDigitsNonFinite(convertedValue),
      this.audioContext.currentTime,
      TIME_CONSTANT,
    );
  }

  setQ(value: number) {
    this.node.Q.setTargetAtTime(
      value * 100, // Q nominal range is 0.0001 to 1000
      this.audioContext.currentTime,
      TIME_CONSTANT,
    );
  }

  setGain(value: number) {
    const convertedValue = linearToLinearRange(value, [-40, 40]);

    this.node.gain.setTargetAtTime(
      convertedValue,
      this.audioContext.currentTime,
      TIME_CONSTANT,
    );
  }
}
