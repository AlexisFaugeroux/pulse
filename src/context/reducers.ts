import { audioContext, masterGain } from '../nodesConfig';
import { InitialSettingsState, OscSettings } from '../types/types';
import Oscillator from '../utils/classes/Oscillator';
import {
  Oscillators_ActionTypes,
  type OscillatorSettingsActions,
} from './type';

let currentOscillators: Oscillator[] = [];

const oscillatorsReducer = (
  state: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
  },
  action: OscillatorSettingsActions,
) => {
  switch (action.type) {
    case Oscillators_ActionTypes.Create:
      {
        if (state.oscillatorA.isActive) {
          const newOscillator = new Oscillator(
            audioContext,
            masterGain,
            state.oscillatorA.type,
            action.payload.frequency,
            state.oscillatorA.detune,
            state.oscillatorA.adsr,
          );
          currentOscillators.push(newOscillator);
        } else if (state.oscillatorB.isActive) {
          const newOscillator = new Oscillator(
            audioContext,
            masterGain,
            state.oscillatorB.type,
            action.payload.frequency,
            state.oscillatorB.detune,
            state.oscillatorB.adsr,
          );
          currentOscillators.push(newOscillator);
        }
      }
      return { ...state };

    case Oscillators_ActionTypes.Kill:
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

    case Oscillators_ActionTypes.Activate:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id as keyof typeof state],
          isActive: true,
        },
      };

    case Oscillators_ActionTypes.Deactivate:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id as keyof typeof state],
          isActive: false,
        },
      };

    case Oscillators_ActionTypes.UpdateSettings:
      return { ...state, [action.payload.id]: action.payload.value };

    case Oscillators_ActionTypes.UpdateType:
      return { ...state, type: action.payload.id as OscillatorType };

    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};

export const mainReducer = (
  { oscillators }: InitialSettingsState,
  action: OscillatorSettingsActions,
) => ({
  oscillators: oscillatorsReducer(oscillators, action),
});
