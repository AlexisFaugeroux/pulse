import { audioContext, masterGain } from '../nodesConfig';
import { InitialSettingsState, OscSettings } from '../types/types';
import Oscillator from '../utils/classes/Oscillator';
import {
  OscillatorA_ActionTypes,
  type OscillatorASettingsActions,
} from './type';

export let currentOscillators: Oscillator[] = [];

const oscillatorAReducer = (
  state: OscSettings,
  action: OscillatorASettingsActions,
) => {
  switch (action.type) {
    case OscillatorA_ActionTypes.Create:
      {
        const newOscillator = new Oscillator(
          audioContext,
          masterGain,
          state.type,
          action.payload.frequency,
          state.detune,
          state.adsr,
        );
        currentOscillators.push(newOscillator);
      }
      return { ...state };

    case OscillatorA_ActionTypes.Kill:
      {
        const activeOscillators: Oscillator[] = [];

        currentOscillators.forEach((oscillator) => {
          if (
            Math.round(oscillator.node.frequency.value) ===
            Math.round(action.payload.frequency)
          ) {
            oscillator.stop();
          } else {
            activeOscillators.push(oscillator);
          }
        });
        currentOscillators = activeOscillators;
      }
      return { ...state };

    case OscillatorA_ActionTypes.UpdateSettings:
      return { ...state, [action.payload.id]: action.payload.value };

    case OscillatorA_ActionTypes.UpdateType:
      return { ...state, type: action.payload.id as OscillatorType };

    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};

export const mainReducer = (
  { oscillatorA }: InitialSettingsState,
  action: OscillatorASettingsActions,
) => ({
  oscillatorA: oscillatorAReducer(oscillatorA, action),
});
