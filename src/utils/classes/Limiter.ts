export default class Limiter {
  node: DynamicsCompressorNode;

  constructor(audioContext: AudioContext) {
    const { currentTime } = audioContext;

    this.node = audioContext.createDynamicsCompressor();
    this.node.threshold.setValueAtTime(-12, currentTime);
    this.node.knee.setValueAtTime(0, currentTime);
    this.node.ratio.setValueAtTime(20, currentTime);
    this.node.attack.setValueAtTime(0.001, currentTime);
    this.node.release.setValueAtTime(0.1, currentTime);
  }

  connect(destination: AudioNode) {
    this.node.connect(destination);
  }
}
