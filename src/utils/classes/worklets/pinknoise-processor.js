//noisehack.com/generate-noise-web-audio-api/
export default class PinkNoiseProcessor extends AudioWorkletProcessor {
  _b0;
  _b1;
  _b2;
  _b3;
  _b4;
  _b5;
  _b6;

  constructor(options) {
    super(options);
    this._b0 = 0.0;
    this._b1 = 0.0;
    this._b2 = 0.0;
    this._b3 = 0.0;
    this._b4 = 0.0;
    this._b5 = 0.0;
    this._b6 = 0.0;
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
        this._b0 = 0.99886 * this._b0 + whiteNoise * 0.0555179;
        this._b1 = 0.99332 * this._b1 + whiteNoise * 0.0750759;
        this._b2 = 0.969 * this._b2 + whiteNoise * 0.153852;
        this._b3 = 0.8665 * this._b3 + whiteNoise * 0.3104856;
        this._b4 = 0.55 * this._b4 + whiteNoise * 0.5329522;
        this._b5 = -0.7616 * this._b5 - whiteNoise * 0.016898;

        output[channelIndex][sampleIndex] =
          this._b0 +
          this._b1 +
          this._b2 +
          this._b3 +
          this._b4 +
          this._b5 +
          this._b6 +
          whiteNoise * 0.5362;

        output[channelIndex][sampleIndex] *= 0.11;
        this._b6 = whiteNoise * 0.115926;
      }
    }

    return true;
  }
}

registerProcessor('pinkNoise', PinkNoiseProcessor);
