export default class LFO {
  node;
  easing;

  constructor(
    public audioContext: AudioContext,
    public destination: GainNode,
    public type: OscillatorType,
    public frequency: number,
  ) {
    this.audioContext = audioContext;
    this.node = this.audioContext.createOscillator();
    this.node.type = type;
    this.node.frequency.value = frequency;
    this.easing = 0.006;

    this.node.connect(destination);
    this.node.start();
  }
}
