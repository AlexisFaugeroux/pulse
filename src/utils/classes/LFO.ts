import { initialSettings, oscAGain, oscBGain } from '../../nodesConfig';
import { TIME_CONSTANT } from '../constants';
import { linearToLinearRange, roundTwoDigits } from '../helpers';

export default class LFO {
  node;
  easing;
  mixGain;

  constructor(public audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.node = this.audioContext.createOscillator();
    this.node.type = initialSettings.lfo.type;
    this.node.frequency.value = initialSettings.lfo.frequency;
    this.easing = 0.006;

    this.mixGain = this.audioContext.createGain();
    this.mixGain.gain.value = initialSettings.lfo.gain;

    this.wireUp();
    this.node.start();
  }

  connect(destination: AudioParam) {
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

    this.mixGain.connect(oscAGain.gain);
    this.mixGain.connect(oscBGain.gain);
  }

  deactivate() {
    this.mixGain.gain.setValueAtTime(
      0,
      this.audioContext.currentTime + TIME_CONSTANT,
    );

    this.mixGain.disconnect();
  }

  setRate(value: number) {
    const convertedValue = linearToLinearRange(value, [0.1, 15]);

    this.node.frequency.setValueAtTime(
      convertedValue,
      this.audioContext.currentTime + TIME_CONSTANT,
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
