import { FXs, TIME_CONSTANT } from '../../constants';
import { linearToLinearRange } from '../../helpers';
import FX from './FX';

export default class Compressor extends FX {
  node: DynamicsCompressorNode;

  constructor(audioContext: AudioContext) {
    super(audioContext, FXs.COMPRESSOR);

    this.node = audioContext.createDynamicsCompressor();

    this.wireUp(this.node);
  }

  setThreshold(value: number) {
    // Threshold can vary from -100 to 0
    const convertedValue = -((1 - value) * 100);

    this.node.threshold.setValueAtTime(
      convertedValue,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setRatio(value: number) {
    const convertedValue = linearToLinearRange(value, [1, 20]);

    this.node.ratio.setValueAtTime(
      convertedValue,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setKnee(value: number) {
    const convertedValue = linearToLinearRange(value, [0, 40]);

    this.node.knee.setValueAtTime(
      convertedValue,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setAttack(value: number) {
    this.node.attack.setValueAtTime(
      value,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setRelease(value: number) {
    this.node.release.setValueAtTime(
      value,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }
}
