export default class BitcrusherProcessor extends AudioWorkletProcessor {
  _lastSampleValue;

  constructor(options) {
    super(options);
    this._lastSampleValue = 0;
  }

  // Define custom AudioParams
  // The returned value of parameterDescriptors will be used internally to create the AudioParams
  // during the instantiation of the AudioWorkletNode
  static get parameterDescriptors() {
    return [
      {
        name: 'bitDepth',
        defaultValue: 12,
        minValue: 1,
        maxValue: 16,
      },
      {
        name: 'downsampling',
        defaultValue: 1,
        minValue: 1,
        maxValue: 40,
      },
    ];
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const bits = parameters.bitDepth[0];
    const downsampling = parameters.downsampling[0];

    for (let channelIndex = 0; channelIndex < output.length; ++channelIndex) {
      for (
        let sampleIndex = 0;
        sampleIndex < output[channelIndex].length;
        ++sampleIndex
      ) {
        if (!input[channelIndex]) return false;

        if (sampleIndex % downsampling === 0) {
          const step = Math.pow(0.5, bits);
          this._lastSampleValue =
            step * Math.floor(input[channelIndex][sampleIndex] / step);
        }

        output[channelIndex][sampleIndex] = this._lastSampleValue;
      }
    }
    // Forces the web audio api to keep the node alive even if no data is coming from its inputs
    return true;
  }
}

registerProcessor('bitcrusher', BitcrusherProcessor);
