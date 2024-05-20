import { initialSettings } from '../../../nodesConfig';
import { FXs } from '../../constants';
import { linearToLinearRange } from '../../helpers';
import FX from './FX';

export default class Reverb extends FX {
  node: ConvolverNode;

  constructor(public audioContext: AudioContext) {
    super(audioContext, FXs.REVERB);
    this.node = audioContext.createConvolver();

    this.setImpulseResponse(
      audioContext,
      this.node,
      linearToLinearRange(initialSettings.reverb.time, [0, 5]),
      linearToLinearRange(initialSettings.reverb.decay, [0, 10]),
    );

    this.wireUp(this.node);
  }

  setImpulseResponse(
    audioContext: AudioContext,
    node: ConvolverNode,
    time: number,
    decay: number,
  ) {
    const convertedTime = linearToLinearRange(time, [0, 5]);
    const convertedDecay = linearToLinearRange(decay, [0, 10]);

    const sampleRate = audioContext.sampleRate;
    const length = sampleRate * convertedTime;
    const impulse = audioContext.createBuffer(2, length, sampleRate);
    const impulseLeft = impulse.getChannelData(0);
    const impulseRight = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      impulseLeft[i] =
        (Math.random() * 2 - 1) * Math.pow(1 - i / length, convertedDecay);
      impulseRight[i] =
        (Math.random() * 2 - 1) * Math.pow(1 - i / length, convertedDecay);
    }

    node.buffer = impulse;

    return impulse;
  }
}
