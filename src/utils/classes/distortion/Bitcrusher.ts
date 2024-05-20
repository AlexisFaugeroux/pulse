import { initialSettings } from '../../../nodesConfig';
import { FXs } from '../../constants';
import { linearToLinearRange } from '../../helpers';
import FX from '../FXs/FX';

export default class BitcrusherDistortion extends FX {
  node: AudioWorkletNode | null;

  constructor(audioContext: AudioContext) {
    super(audioContext, FXs.BITCRUSHER);
    this.node = null;
  }

  async init() {
    const {
      distortion: { bitcrusher },
    } = initialSettings;

    const bitDepth = linearToLinearRange(bitcrusher.bitDepth, [16, 1]);
    const downsampling = Math.ceil(
      linearToLinearRange(bitcrusher.downsampling, [1, 40]),
    );

    await this.audioContext.audioWorklet.addModule(
      'src/utils/classes/worklets/bitcrusher-processor.js',
    );

    this.node = new AudioWorkletNode(this.audioContext, 'bitcrusher', {
      parameterData: {
        bitDepth,
        downsampling,
      },
    });
    this.wireUp(this.node);
  }

  setBitDepth(value: number) {
    const convertedValue = linearToLinearRange(value, [16, 1]);

    if (this.node) {
      const bitDepth = this.node.parameters.get('bitDepth');
      if (bitDepth) {
        bitDepth.value = convertedValue;
      } else {
        console.error('Cannot find bitDepth param');
      }
    } else {
      console.error('setBitDepth: node is null');
    }
  }

  setDownsampling(value: number) {
    const convertedValue = Math.ceil(linearToLinearRange(value, [1, 40]));

    if (this.node) {
      const downsampling = this.node.parameters.get('downsampling');
      if (downsampling) {
        downsampling.value = convertedValue;
      } else {
        console.error('Cannot find downsampling param');
      }
    } else {
      console.error('setDownsampling: node is null');
    }
  }
}
