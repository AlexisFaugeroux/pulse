import Oscillator from '../../../utils/classes/Oscillator';
import Noise from '../../../utils/classes/noises/Noise';
import {
  Oscillator_TriggerActionsTypes,
  type Oscillator_TriggerActions,
} from '../../types';
import { createNoise } from './createNoise';
import { killNoise } from './killNoise';
import { killOsc } from './killOsc';
import { createOsc } from './createOsc';
import { OscillatroTriggerState } from './types';

export const currentOscillators: Oscillator[] = [];
export const currentNoises: Noise[] = [];

const oscillatorTriggerReducer = async (
  state: OscillatroTriggerState,
  action: Oscillator_TriggerActions,
): Promise<void> => {
  const defaultEnvelopeSettings = {
    attack: 0.005,
    decay: 1,
    sustain: 1,
    release: 0.1,
  };

  switch (action.type) {
    case Oscillator_TriggerActionsTypes.Create:
      createOsc(state, action, defaultEnvelopeSettings);
      return;
    case Oscillator_TriggerActionsTypes.Kill:
      killOsc(state, action, currentOscillators);
      return;

    case Oscillator_TriggerActionsTypes.CreateNoise:
      createNoise(state, action, currentNoises, defaultEnvelopeSettings);
      return;

    case Oscillator_TriggerActionsTypes.KillNoise: {
      killNoise(action, currentNoises);
      return;
    }

    default:
      console.error('Reducer error action: ', action);
      return;
  }
};

export default oscillatorTriggerReducer;
