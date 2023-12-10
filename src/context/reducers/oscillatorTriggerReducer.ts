import { audioContext, oscAGain, oscBGain } from '../../nodesConfig';
import { EnvelopeSettings, OscSettings } from '../../types/types';
import Oscillator from '../../utils/classes/Oscillator';
import {
  Oscillator_TriggerActionsTypes,
  type Oscillator_TriggerActions,
} from '../types';

export let currentOscillators: Oscillator[] = [];

const oscillatorTriggerReducer = (
  state: {
    oscillators: {
      oscillatorA: OscSettings;
      oscillatorB: OscSettings;
    };
    envelope: EnvelopeSettings;
  },
  action: Oscillator_TriggerActions,
): void => {
  const { oscillatorA, oscillatorB } = state.oscillators;
  const { envelope } = state;
  const { note, frequency } = action.payload;

  const defaultEnvelopeSettings = {
    attack: 0.005,
    decay: 1,
    sustain: 1,
    release: 0.1,
  };

  switch (action.type) {
    case Oscillator_TriggerActionsTypes.Create:
      {
        if (!note || !frequency) {
          console.error('Create oscillator A: note or frequency not provided');
          return;
        }

        if (oscillatorA.isActive && oscillatorB.isActive) {
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
          currentOscillators.push(newOscillatorA, newOscillatorB);
        } else if (oscillatorA.isActive) {
          const newOscillator = new Oscillator(
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
          currentOscillators.push(newOscillator);
        } else if (oscillatorB.isActive) {
          const newOscillator = new Oscillator(
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
          currentOscillators.push(newOscillator);
        }
      }
      return;
    case Oscillator_TriggerActionsTypes.Kill:
      {
        const activeOscillators: Oscillator[] = [];

        currentOscillators.forEach((oscillator) => {
          const { node, parent, octaveShift, stop } = oscillator;

          const { frequency: shiftedFrequency } = octaveShift(
            state.oscillators[parent as keyof typeof state.oscillators]
              .octaveOffset,
            frequency ?? 0,
          );
          if (
            Math.round(node.frequency.value) === Math.round(shiftedFrequency)
          ) {
            stop();
          } else {
            activeOscillators.push(oscillator);
          }
        });

        currentOscillators = activeOscillators;
      }
      return;

    default:
      console.log('Reducer error action: ', action);
      return;
  }
};

export default oscillatorTriggerReducer;
