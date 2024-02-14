import { TIME_CONSTANT } from '../constants';
import { linearToLogarithmRange, roundTwoDigits } from '../helpers';

export default class LFO {
  node;
  easing;
  mixGain;

  constructor(
    public audioContext: AudioContext,
    public type: OscillatorType,
    public frequency: number,
  ) {
    this.audioContext = audioContext;
    this.node = this.audioContext.createOscillator();
    this.node.type = type;
    this.node.frequency.value = frequency;
    this.easing = 0.006;

    this.mixGain = this.audioContext.createGain();

    this.wireUp();
    this.node.start();
  }

  connect(destination: AudioNode) {
    this.mixGain.connect(destination);
  }

  disconnect() {
    this.mixGain.disconnect();
  }

  activate({ gain }: { gain: number }) {
    this.mixGain.gain.setValueAtTime(
      gain,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  deactivate() {
    this.mixGain.gain.setValueAtTime(
      0,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
    this.mixGain.disconnect();
  }

  setRate(value: number) {
    const convertedValue = linearToLogarithmRange({
      base: 10,
      value: value,
      linearRange: [0, 1],
      logarithmicRange: [0.1, 20],
    });

    this.node.frequency.setTargetAtTime(
      convertedValue,
      this.audioContext.currentTime,
      TIME_CONSTANT,
    );
  }

  setType(type: OscillatorType) {
    this.node.type = type;
  }

  setGain(value: number) {
    this.mixGain.gain.setValueAtTime(
      // Input value based on mouse drag has precision issue, value is often not 0 when input visually is
      value < 0.03 ? 0 : roundTwoDigits(value),
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  wireUp() {
    this.node.connect(this.mixGain);
  }
}
