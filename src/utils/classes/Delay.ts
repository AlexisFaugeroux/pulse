import { initialSettings } from '../../nodesConfig';
import { FXs, TIME_CONSTANT } from '../constants';
import { linearToLinearRange } from '../helpers';
import FX from './FX';

export default class Delay extends FX {
  node: DelayNode;
  feedback;

  constructor(public audioContext: AudioContext) {
    super(audioContext, FXs.DELAY);
    this.node = audioContext.createDelay(10); // 10 = maximum delay time allowed
    this.feedback = audioContext.createGain();

    this.feedback.gain.value = initialSettings.delay.feedback;

    this.wireUp();
  }

  setTime(value: number) {
    const convertedValue = linearToLinearRange(value, [0, 2]);

    this.node.delayTime.setTargetAtTime(
      convertedValue,
      this.audioContext.currentTime,
      TIME_CONSTANT,
    );
  }

  setFeedback(value: number) {
    this.feedback.gain.setTargetAtTime(
      value,
      this.audioContext.currentTime,
      TIME_CONSTANT,
    );
  }

  wireUp() {
    super.wireUp(this.node);

    this.node.connect(this.feedback);
    this.feedback.connect(this.node);
  }
}
