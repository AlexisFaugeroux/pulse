import { getAudioGraph } from '../../audio/audioGraph';
import { currentOscillators } from '../../contexts/reducers/oscillators/oscillatorTriggerReducer';
import { LFOSettings } from '../../types/types';
import { LFOMode, TIME_CONSTANT } from '../constants';
import { linearToLinearRange, roundTwoDigits } from '../helpers';

export default class LFO {
  node;
  easing;
  mixGain;
  mode: LFOMode;

  constructor(
    public audioContext: AudioContext,
    public settings: LFOSettings,
  ) {
    this.audioContext = audioContext;
    this.node = this.audioContext.createOscillator();
    this.node.type = settings.type;
    this.node.frequency.value = settings.frequency;
    this.easing = 0.006;

    this.mixGain = this.audioContext.createGain();
    this.mixGain.gain.value = settings.gain;

    this.mode = LFOMode.TREMOLO;

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
    const graph = getAudioGraph();

    if (graph) {
      const {
        oscAGain,
        oscBGain,
        subGain,
        whiteNoiseGain,
        brownNoiseGain,
        pinkNoiseGain,
      } = graph.nodes;

      this.mixGain.gain.setValueAtTime(
        gain,
        this.audioContext.currentTime + TIME_CONSTANT,
      );

      this.mixGain.connect(oscAGain.gain);
      this.mixGain.connect(oscBGain.gain);
      this.mixGain.connect(subGain.gain);
      this.mixGain.connect(whiteNoiseGain.gain);
      this.mixGain.connect(brownNoiseGain.gain);
      this.mixGain.connect(pinkNoiseGain.gain);
    } else {
      console.error('Could not activate LFO, audio graph is null');
    }
  }

  deactivate() {
    this.mixGain.gain.setValueAtTime(
      0,
      this.audioContext.currentTime + TIME_CONSTANT,
    );

    this.mixGain.disconnect();
  }

  setMode(mode: LFOMode) {
    const graph = getAudioGraph();

    if (graph) {
      const {
        oscAGain,
        oscBGain,
        subGain,
        whiteNoiseGain,
        brownNoiseGain,
        pinkNoiseGain,
      } = graph.nodes;

      this.mode = mode;
      switch (mode) {
        case LFOMode.TREMOLO:
          this.disconnect();
          this.connect(oscAGain.gain);
          this.connect(oscBGain.gain);
          this.connect(subGain.gain);
          this.connect(whiteNoiseGain.gain);
          this.connect(pinkNoiseGain.gain);
          this.connect(brownNoiseGain.gain);
          return;

        case LFOMode.VIBRATO:
          this.disconnect();
          currentOscillators.forEach((oscillator) => {
            this.connect(oscillator.node.frequency);
          });
          return;

        default:
          return console.error('setMode: unknown lfo mode');
      }
    }
    else {
      console.error('Could not set LFO mode, audio graph is null');
    }
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

  setTremoloGain(value: number) {
    this.mixGain.gain.setValueAtTime(
      // Input value based on mouse drag has precision issue, value is often not 0 when input visually is
      value < 0.03 ? 0 : roundTwoDigits(value),
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setVibratoGain(value: number) {
    this.mixGain.gain.setValueAtTime(
      // Input value based on mouse drag has precision issue, value is often not 0 when input visually is
      roundTwoDigits(value * 100),
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  wireUp() {
    this.node.connect(this.mixGain);
  }
}
