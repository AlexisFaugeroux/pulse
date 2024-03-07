import { initialSettings } from '../../../nodesConfig';
import { DistortionType, FXs } from '../../constants';
import { linearToLinearRange } from '../../helpers';
import FX from '../FX';

export default class ClippingDistortion extends FX {
  node: WaveShaperNode;
  drive;
  type;

  constructor(public audioContext: AudioContext) {
    super(audioContext, FXs.DELAY);

    this.drive = initialSettings.distortion.clipping.drive;
    this.type = initialSettings.distortion.clipping.type;

    this.node = audioContext.createWaveShaper();
    this.node.oversample = '2x';

    this.makeDistortionCurve(this.drive, this.type);
    this.wireUp(this.node);
  }

  setDrive(value: number) {
    const convertedValue =
      this.type === DistortionType.SOFT
        ? linearToLinearRange(value, [0.1, 500])
        : linearToLinearRange(value, [0.1, 10]);

    this.drive = convertedValue;
    return convertedValue;
  }

  setType(type: DistortionType) {
    this.type = type;
  }

  makeDistortionCurve(drive: number, type: DistortionType) {
    const n_samples = this.audioContext.sampleRate;
    const curve = new Float32Array(n_samples);

    if (type === DistortionType.SOFT) {
      for (let i = 0; i < n_samples; i++) {
        const x = (i * 2) / n_samples - 1;
        curve[i] = 2 / (1 + Math.exp(-(x * drive))) - 1;
      }
    }

    if (type === DistortionType.HARD) {
      for (let i = 0; i < n_samples; i++) {
        const x = (2 * i) / n_samples - 1;
        if (Math.abs(x) > 1 / drive) {
          curve[i] = 1 * Math.sign(x);
        }
        curve[i] = drive * x;
      }
    }

    this.node.curve = curve;

    return curve;
  }
}
