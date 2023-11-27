import { EnvelopeSettings } from '../../types/types';

export default class Oscillator {
  constructor(
    public audioContext: AudioContext,
    public destination: GainNode,
    public type: OscillatorType,
    public frequency: number,
    public detune: number,
    public adsr: EnvelopeSettings | null,
    public parent: string,
  ) {
    this.audioContext = audioContext;
    this.node = this.audioContext.createOscillator();
    this.node.type = type;
    this.node.frequency.value = frequency;
    this.node.detune.setValueAtTime(
      detune * 100,
      this.audioContext.currentTime,
    );

    this.parent = parent;

    this.envelope = adsr
      ? adsr
      : {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.6,
          release: 0.1,
        };
    this.easing = 0.006;

    this.gateGain = this.audioContext.createGain();
    this.gateGain.gain.value = 0;

    this.node.connect(this.gateGain);
    this.gateGain.connect(destination);
    this.node.start();
    this.start();
  }
  node;
  envelope;
  easing;
  gateGain;

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

    // Release
    this.gateGain.gain.setTargetAtTime(
      0,
      currentTime,
      this.envelope.release + this.easing,
    );

    setTimeout(() => {
      this.node.disconnect();
    }, 1000);
  }
}
