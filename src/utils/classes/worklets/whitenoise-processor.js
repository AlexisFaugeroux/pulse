export default class WhiteNoiseProcessor extends AudioWorkletProcessor {
  process(_, outputs) {
    const output = outputs[0];

    for (let channelIndex = 0; channelIndex < output.length; ++channelIndex) {
      for (
        let sampleIndex = 0;
        sampleIndex < output[channelIndex].length;
        ++sampleIndex
      ) {
        output[channelIndex][sampleIndex] = Math.random() * 2 + 1;
      }
    }

    return true;
  }
}

registerProcessor('whitenoise', WhiteNoiseProcessor);
