import { PhaserSettings } from '../../../types/types';
import { FXs } from '../../constants';
import { linearToLinearRange, linearToLogarithmRange } from '../../helpers';
import FX from './FX';

// Inspired by Tuna.js and Tone.js Phaser classes

class PhaserNode extends GainNode {
  public baseFrequency: number;
  public depth: number;
  public frequencyOffset: number;
	public q: number;
	readonly feedback: number;
  readonly octaves: number;
  readonly stages: BiquadFilterNode[];
	readonly numberOfStages: number;
  readonly output: GainNode;
  readonly feedbackGain: GainNode;
  readonly lfo: OscillatorNode;
  readonly lfoGain: GainNode;

  constructor(public audioContext: AudioContext, public settings: PhaserSettings) {
    super(audioContext);

    /* const settings = {
      rate: 0.3,
      depth: 0.5,
      feedback: 0.3,
      baseFrequency: 580,
      frequencyOffset: 200,
      q: 0.005,
      stages: 4,
      octaves: 2,
    }; */

		this.feedback = 0.3;
    this.baseFrequency = settings.baseFrequency * 1000;
    this.octaves = 2;
    this.depth = settings.depth;
    this.frequencyOffset = settings.frequencyOffset * 1000;
		this.q = settings.q / 10.0;
		this.numberOfStages = 4;

    this.output = this.audioContext.createGain();

    // Create all the filters for the phaser
    this.stages = [];
    for (let i = 0; i < this.numberOfStages - 1; i++) {
      const filter = this.audioContext.createBiquadFilter();
      filter.type = 'allpass';
      filter.frequency.value = this.baseFrequency + i * this.frequencyOffset;
      filter.Q.value = settings.q;
      this.stages.push(filter);
    }

    // Connect stages
    this.connect(this.stages[0]);
    for (let i = 0; i < this.stages.length - 1; i++) {
      this.stages[i].connect(this.stages[i + 1]);
    }
    this.stages[this.stages.length - 1].connect(this.output);

    this.feedbackGain = this.audioContext.createGain();
    this.feedbackGain.gain.value = this.feedback;
    this.stages[this.stages.length - 1].connect(this.feedbackGain);
    this.feedbackGain.connect(this.stages[0]);

    this.lfo = this.audioContext.createOscillator();
    this.lfoGain = this.audioContext.createGain();

    this.lfo.connect(this.lfoGain);
    this.stages.forEach((filter) => {
      this.lfoGain.connect(filter.frequency);
    });
  }
}

class StereoPhaser extends GainNode {
  readonly output: GainNode;
  private splitter: ChannelSplitterNode;
  private merger: ChannelSplitterNode;
  readonly leftPhaser: PhaserNode;
  readonly rightPhaser: PhaserNode;

  constructor(public audioContext: AudioContext, public settings: PhaserSettings) {
    super(audioContext);

    this.leftPhaser = new PhaserNode(audioContext, settings);
    this.rightPhaser = new PhaserNode(audioContext, settings);
    this.splitter = audioContext.createChannelSplitter(2);
    this.merger = audioContext.createChannelMerger(2);
    this.output = audioContext.createGain();

    this.connect(this.splitter);

    this.splitter.connect(this.leftPhaser, 0);
    this.leftPhaser.output.connect(this.merger, 0, 0);

    this.splitter.connect(this.rightPhaser, 1);
    this.rightPhaser.output.connect(this.merger, 0, 1);

    this.merger.connect(this.output);

    this.leftPhaser.lfo.start();
    this.rightPhaser.lfo.start(
      this.audioContext.currentTime +
      Math.PI / 2 / this.rightPhaser.lfo.frequency.value, // 90° offset
    );
  }

  setRate(value: number) {
    const convertedValue = linearToLogarithmRange({
      base: 10,
      value,
      linearRange: [0, 1],
      logarithmicRange: [0.05, 1],
    });

    this.leftPhaser.lfo.frequency.value = convertedValue;
    this.rightPhaser.lfo.frequency.value = convertedValue;
  }

  setDepth(value: number) {
    let depth =
      (value *
        this.leftPhaser.baseFrequency *
        Math.pow(2, this.leftPhaser.octaves)) /
      2;
    this.leftPhaser.lfoGain.gain.value = depth;

    depth =
      (value *
        this.rightPhaser.baseFrequency *
        Math.pow(2, this.rightPhaser.octaves)) /
      2;
    this.rightPhaser.lfoGain.gain.value = depth;
  }

  setQ(value: number) {
    const convertedValue = linearToLinearRange(value, [0, 10]);

    this.leftPhaser.stages.forEach((filter) => {
      filter.Q.value = convertedValue;
    });
    this.rightPhaser.stages.forEach((filter) => {
      filter.Q.value = convertedValue;
    });
  }

  setBaseFrequency(value: number) {
    const convertedValue = linearToLinearRange(value, [500, 1500]);

    this.leftPhaser.baseFrequency = convertedValue;
    this.leftPhaser.stages.forEach((filter, index) => {
      filter.frequency.value =
        convertedValue + index * this.leftPhaser.frequencyOffset;
    });

    this.rightPhaser.baseFrequency = convertedValue;
    this.rightPhaser.stages.forEach((filter, index) => {
      filter.frequency.value =
        convertedValue + index * this.rightPhaser.frequencyOffset;
    });

    this.setDepth(this.leftPhaser.depth);
    this.setDepth(this.rightPhaser.depth);
  }
}

export default class Phaser extends FX {
  node: StereoPhaser;

  constructor(public audioContext: AudioContext, public settings: PhaserSettings) {
    super(audioContext, FXs.PHASER);
    this.node = new StereoPhaser(audioContext, settings);
    this.wireUp(this.node.output);
  }

  setRate(value: number) {
    this.node.setRate(value);
  }

  setDepth(value: number) {
    this.node.setDepth(value);
  }

  setQ(value: number) {
    this.node.setQ(value);
  }

  setBaseFrequency(value: number) {
    this.node.setBaseFrequency(value);
  }
}
