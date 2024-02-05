import { initialSettings } from '../../nodesConfig';
import { FXs } from '../constants';
import FX from './FX';

export default class Delay extends FX {
  constructor(public audioContext: AudioContext) {
    super(audioContext, FXs.DELAY);
    this.node = audioContext.createDelay(10); // 10 = maximum delay time allowed
    this.feedback = audioContext.createGain();

    this.feedback.gain.value = initialSettings.delay.feedback;

    this.wireUp();
  }

  node: DelayNode;
  feedback;

  wireUp() {
    super.wireUp(this.node);

    this.node.connect(this.feedback);
    this.feedback.connect(this.node);
  }
}
