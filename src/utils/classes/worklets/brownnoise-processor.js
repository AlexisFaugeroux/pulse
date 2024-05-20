//noisehack.com/generate-noise-web-audio-api/
export default class BrownNoiseProcessor extends AudioWorkletProcessor {
  _lastOut;

  constructor(options) {
    super(options);
    this._lastOut = 0.0;
  }

  process(_, outputs) {
    const output = outputs[0];

    for (let channelIndex = 0; channelIndex < output.length; channelIndex++) {
      for (
        let sampleIndex = 0;
        sampleIndex < output[channelIndex].length;
        sampleIndex++
      ) {
        const whiteNoise = Math.random() * 2 - 1;
        output[channelIndex][sampleIndex] =
          (this._lastOut + 0.02 * whiteNoise) / 1.02;
        this._lastOut = output[channelIndex][sampleIndex];
        output[channelIndex][sampleIndex] *= 3.5;
      }
    }

    return true;
  }
}

registerProcessor('brownNoise', BrownNoiseProcessor);
