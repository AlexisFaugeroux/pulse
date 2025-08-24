import Oscillator from '../../../utils/classes/Oscillator';
import { audioContext, lfo, oscAGain, oscBGain, subGain } from '../../../nodesConfig';
import { LFOMode } from '../../../utils/constants';
import type { Oscillator_TriggerActions } from '../../types';
import { currentOscillators } from './oscillatorTriggerReducer';
import type { OscillatroTriggerState } from './types';

export function createOsc(
  state: OscillatroTriggerState,
  action: Oscillator_TriggerActions,
  defaultEnvelopeSettings: {
    attack: number,
    decay: number,
    sustain: number,
    release: number,
  },
): void {
  const {
    oscillators: { oscillatorA, oscillatorB, subOscillator },
    envelope,
  } = state;

  const { note, frequency } = action.payload;
  if (!note || !frequency) {
    console.error('Create oscillator: note or frequency not provided');
    return;
  }

  if (oscillatorA.isActive) {
    const newOscillatorA = new Oscillator(
      audioContext,
      oscAGain,
      oscillatorA.type,
      note,
      frequency,
      oscillatorA.octaveOffset,
      oscillatorA.detune,
      envelope.isActive
        ? envelope
        : { isActive: false, ...defaultEnvelopeSettings },
      oscillatorA.id,
    );
    if (lfo.mode === LFOMode.VIBRATO) {
      lfo.connect(newOscillatorA.node.frequency);
    }
    currentOscillators.push(newOscillatorA);
  }

  if (oscillatorB.isActive) {
    const newOscillatorB = new Oscillator(
      audioContext,
      oscBGain,
      oscillatorB.type,
      note,
      frequency,
      oscillatorB.octaveOffset,
      oscillatorB.detune,
      envelope.isActive
        ? envelope
        : { isActive: false, ...defaultEnvelopeSettings },
      oscillatorB.id,
    );
    if (lfo.mode === LFOMode.VIBRATO) {
      lfo.connect(newOscillatorB.node.frequency);
    }
    currentOscillators.push(newOscillatorB);
  }

  if (subOscillator.isActive) {
    const newSub = new Oscillator(
      audioContext,
      subGain,
      subOscillator.type,
      note,
      frequency,
      subOscillator.octaveOffset,
      0,
      envelope.isActive
        ? envelope
        : { isActive: false, ...defaultEnvelopeSettings },
      subOscillator.id,
    );
    if (lfo.mode === LFOMode.VIBRATO) {
      lfo.connect(newSub.node.frequency);
    }
    currentOscillators.push(newSub);
  }
}
