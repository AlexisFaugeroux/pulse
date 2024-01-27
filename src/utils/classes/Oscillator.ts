import { EnvelopeSettings } from '../../types/types';
import { NOTES } from '../constants';

export default class Oscillator {
  node;
  easing;
  gateGain;

  constructor(
    public audioContext: AudioContext,
    public destination: GainNode,
    public type: OscillatorType,
    public note: string,
    public frequency: number,
    public offset: number,
    public detune: number,
    public envelope: EnvelopeSettings,
    public parent: string,
  ) {
    const { frequency: newFrequency } = this.octaveShift(offset, note);

    this.audioContext = audioContext;
    this.node = this.audioContext.createOscillator();
    this.node.type = type;
    this.node.frequency.value = newFrequency;
    this.node.detune.setValueAtTime(
      detune * 100,
      this.audioContext.currentTime,
    );
    this.offset = offset;

    this.parent = parent;

    this.envelope = envelope;
    this.easing = 0.006;

    this.gateGain = this.audioContext.createGain();
    this.gateGain.gain.value = 0;

    this.stop = this.stop.bind(this);

    this.node.connect(this.gateGain);
    this.gateGain.connect(destination);
    this.node.start();
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

    // In case the key pressed is released before the gain value reaches 1 (as defined by the attack param)
    // the time changing event is cancelled and the gain value reverts to 0 immediately which causes an ugly click sound
    // This eases the transition if such case occurs :
    if (this.gateGain.gain.value !== 1) {
      // Need to schedule a value becasue exponentialRampToValueAtTime starts at the time specified for the previous event
      // https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/exponentialRampToValueAtTime
      this.gateGain.gain.setValueAtTime(this.gateGain.gain.value, currentTime);
      this.gateGain.gain.exponentialRampToValueAtTime(
        0.0001,
        currentTime + 0.03,
      );
      return;
    }
    this.gateGain.gain.cancelScheduledValues(currentTime);
    // Release
    this.gateGain.gain.setTargetAtTime(
      0,
      currentTime,
      this.envelope.release + this.easing,
    );

    setTimeout(() => {
      this.node.disconnect();
    }, 10000);
  }

  octaveShift(
    offset: number,
    valueToShift: string | number,
  ): {
    note: string;
    frequency: number;
  } {
    let valueParam = 'note';

    if (typeof valueToShift === 'number') {
      valueParam = 'frequency';
      valueToShift = Math.round(valueToShift * 100 + Number.EPSILON) / 100;
    }

    const shiftedNoteIndex =
      NOTES.findIndex((noteParams) => noteParams[valueParam] === valueToShift) +
      offset * 12;

    if (shiftedNoteIndex === -1) {
      return (
        NOTES.find((noteParams) => noteParams[valueParam] === valueToShift) ?? {
          note: '',
          frequency: 0,
        }
      );
    }
    const shiftedNote = NOTES.find((_, index) => index === shiftedNoteIndex) ??
      NOTES.find((noteParams) => noteParams[valueParam] === valueToShift) ?? {
        note: '',
        frequency: 0,
      };

    return shiftedNote;
  }
}
