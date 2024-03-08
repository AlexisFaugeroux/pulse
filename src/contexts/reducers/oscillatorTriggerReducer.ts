import {
  audioContext,
  lfo,
  oscAGain,
  oscBGain,
  subGain,
} from '../../nodesConfig';
import type {
  EnvelopeSettings,
  OscSettings,
  SubOscSettings,
} from '../../types/types';
import Oscillator from '../../utils/classes/Oscillator';
import { LFOMode } from '../../utils/constants';
import { roundTwoDigits } from '../../utils/helpers';
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
      subOscillator: SubOscSettings;
    };
    envelope: EnvelopeSettings;
  },
  action: Oscillator_TriggerActions,
): void => {
  const {
    oscillators: { oscillatorA, oscillatorB, subOscillator },
    envelope,
  } = state;
  const { note, frequency } = action.payload;

  const defaultEnvelopeSettings = {
    attack: 0.005,
    decay: 1,
    sustain: 1,
    release: 0.1,
  };

  switch (action.type) {
    case Oscillator_TriggerActionsTypes.Create: {
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
      return;
    }
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
            roundTwoDigits(node.frequency.value) ===
            roundTwoDigits(shiftedFrequency)
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
