import { ChorusSettings } from '../../../types/types';
import { FXs, TIME_CONSTANT } from '../../constants';
import { linearToLinearRange } from '../../helpers';
import FX from './FX';

// Inspired by Tuna.js and Tone.js chorus classes
//
class ChorusNode extends GainNode {
  readonly delayNodeLeft;
  readonly delayNodeRight;
  readonly feedbackGainNodeLeft;
  readonly feedbackGainNodeRight;
  readonly lfoLeft;
  public lfoRight;
  readonly lfoGainNodeLeft;
  readonly lfoGainNodeRight;
  readonly sourceSplitter;
  readonly splitter;
  readonly merger;
  readonly stereoSource;
  public feedback: number;
  public delayTime: number;
  public depth: number;
  public rate: number;
  public stereoPhase: number;

  constructor(public audioContext: AudioContext, public settings: ChorusSettings) {
    super(audioContext);

    this.delayTime = this.settings.time;
    this.depth = this.settings.depth;
    this.feedback = this.settings.feedback;
    this.rate = this.settings.rate;
    this.stereoPhase = linearToLinearRange(
      this.settings.stereoPhase,
      [0, 180],
    );

    this.delayNodeLeft = this.audioContext.createDelay();
    this.delayNodeRight = this.audioContext.createDelay();
    this.feedbackGainNodeLeft = this.audioContext.createGain();
    this.feedbackGainNodeRight = this.audioContext.createGain();
    this.lfoLeft = this.audioContext.createOscillator();
    this.lfoRight = this.audioContext.createOscillator();
    this.lfoGainNodeLeft = this.audioContext.createGain();
    this.lfoGainNodeRight = this.audioContext.createGain();
    this.sourceSplitter = this.audioContext.createChannelSplitter(2);
    this.splitter = this.audioContext.createChannelSplitter(2);
    this.merger = this.audioContext.createChannelMerger(2);
    this.stereoSource = this.audioContext.createChannelMerger(2);

    // Make input signal stereo
    this.connect(this.sourceSplitter);
    this.sourceSplitter.connect(this.stereoSource, 0, 0);
    this.sourceSplitter.connect(this.stereoSource, 0, 1);

    this.stereoSource.connect(this.splitter);
    this.splitter.connect(this.delayNodeLeft, 0);
    this.splitter.connect(this.delayNodeRight, 1);

    // Connect delay and feedback
    this.delayNodeLeft.connect(this.feedbackGainNodeLeft);
    this.delayNodeRight.connect(this.feedbackGainNodeRight);

    this.feedbackGainNodeLeft.connect(this.delayNodeLeft);
    this.feedbackGainNodeRight.connect(this.delayNodeRight);

    // Connect lfos to delays
    this.lfoLeft.connect(this.lfoGainNodeLeft);
    this.lfoGainNodeLeft.connect(this.delayNodeLeft.delayTime);
    this.lfoRight.connect(this.lfoGainNodeRight);
    this.lfoGainNodeRight.connect(this.delayNodeRight.delayTime);

    // Offset the two lfos
    const phaseOffset = this.stereoPhase / 360 / this.rate;
    this.lfoRight.start(this.audioContext.currentTime + phaseOffset);
    this.lfoLeft.start();

    this.delayNodeLeft.connect(this.merger, 0, 0);
    this.delayNodeRight.connect(this.merger, 0, 1);
  }
}

export default class Chorus extends FX {
  node: ChorusNode;

  constructor(public audioContext: AudioContext, public settings: ChorusSettings) {
    super(audioContext, FXs.CHORUS);

    this.node = new ChorusNode(this.audioContext, settings);
    this.wireUp(this.node.merger);
  }

  setDepth(value: number) {
    this.node.depth = value;
    const deviation = this.node.delayTime * value;

    this.node.lfoGainNodeLeft.gain.setValueAtTime(
      (this.node.delayTime + deviation) / 2,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
    this.node.lfoGainNodeRight.gain.setValueAtTime(
      (this.node.delayTime + deviation) / 2,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }
  setRate(value: number) {
    const convertedValue = linearToLinearRange(value, [0.001, 0.01]);
    this.node.rate = convertedValue;

    this.node.lfoLeft.frequency.setValueAtTime(
      convertedValue,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
    this.node.lfoRight.frequency.setValueAtTime(
      convertedValue,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setDelay(value: number) {
    this.node.delayTime = value;

    this.node.delayNodeLeft.delayTime.setValueAtTime(
      value,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
    this.node.delayNodeRight.delayTime.setValueAtTime(
      value,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setFeedback(value: number) {
    const convertedValue = linearToLinearRange(value, [0, 0.3]);
    this.node.feedback = convertedValue;

    this.node.feedbackGainNodeLeft.gain.setValueAtTime(
      convertedValue,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
    this.node.feedbackGainNodeRight.gain.setValueAtTime(
      convertedValue + 0.025,
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setStereoPhase(value: number) {
    const convertedValue = linearToLinearRange(value, [0, 180]);
    this.node.stereoPhase = convertedValue;

    const phaseOffset = this.node.stereoPhase / 360 / this.node.rate;
    this.node.lfoRight.stop();
    this.node.lfoRight = this.audioContext.createOscillator();
    this.node.lfoRight.frequency.value = this.node.rate;
    this.node.lfoRight.connect(this.node.lfoGainNodeRight);
    this.node.lfoRight.start(this.audioContext.currentTime + phaseOffset);
  }
}
