import { EnvelopeSettings } from '../../../types/types';
import { Noise_Types } from '../../constants';
import { linearToLinearRange } from '../../helpers';

export default class Noise {
  node: AudioWorkletNode | null;
  gateGain;
  easing;

  constructor(
    public audioContext: AudioContext,
    public destination: GainNode,
    public envelope: EnvelopeSettings,
    public refFrequency: number, // used as an unique 'key' to identify between several noises
    public noiseType: Noise_Types,
  ) {
    this.audioContext = audioContext;
    this.node = null;
    this.envelope = { ...envelope };
    this.setAttack(envelope.attack);
    this.setDecay(envelope.decay);
    this.setSustain(envelope.sustain);
    this.setRelease(envelope.release);
    this.refFrequency = refFrequency;

    this.easing = 0.006;

    this.gateGain = this.audioContext.createGain();
    this.gateGain.gain.value = 0;
  }
  async init() {
    await this.audioContext.audioWorklet.addModule(
      `src/utils/classes/worklets/${this.noiseType.toLowerCase()}-processor.js`,
    );

    this.node = new AudioWorkletNode(this.audioContext, this.noiseType);
    this.wireUp(this.node);
    this.start();
  }

  start() {
    const { currentTime } = this.audioContext;
    this.gateGain.gain.cancelScheduledValues(currentTime);
    this.gateGain.gain.setValueAtTime(0, currentTime + this.easing);
    // Attack
    this.gateGain.gain.linearRampToValueAtTime(
      1,
      currentTime + this.envelope.attack + this.easing,
    );
    // Decay & Sustain
    this.gateGain.gain.linearRampToValueAtTime(
      this.envelope.sustain,
      currentTime + this.envelope.attack + this.envelope.decay + this.easing,
    );
  }

  stop() {
    const { currentTime } = this.audioContext;

    this.gateGain.gain.cancelScheduledValues(currentTime);
    if (this.gateGain.gain.value !== 1) {
      this.gateGain.gain.setValueAtTime(this.gateGain.gain.value, currentTime);
      this.gateGain.gain.setTargetAtTime(
        0,
        currentTime,
        this.envelope.release / 5,
      );
      return;
    }
    this.gateGain.gain.setTargetAtTime(
      0,
      currentTime,
      this.envelope.release / 5,
    );

    setTimeout(() => {
      this.node?.disconnect();
    }, 12000);
  }

  setAttack(value: number) {
    const convertedValue = linearToLinearRange(value, [0, 8]);
    this.envelope.attack = convertedValue;
  }

  setDecay(value: number) {
    const convertedValue = linearToLinearRange(value, [0, 5]);
    this.envelope.decay = convertedValue;
  }

  setSustain(value: number) {
    this.envelope.sustain = value;
  }

  setRelease(value: number) {
    const convertedValue = linearToLinearRange(value, [0, 8]);
    this.envelope.release = convertedValue;
  }

  wireUp(node: AudioNode) {
    if (!node) throw new Error('Noise class wireUp: node is null');
    node.connect(this.gateGain);
    this.gateGain.connect(this.destination);
  }
}
