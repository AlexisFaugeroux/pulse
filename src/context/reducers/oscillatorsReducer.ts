import { audioContext, oscAGain, oscBGain } from '../../nodesConfig';
import { OscSettings } from '../../types/types';
import Oscillator from '../../utils/classes/Oscillator';
import {
  Oscillator_ActionTypes,
  type Oscillator_SettingsActions,
} from '../types/index';

let currentOscillators: Oscillator[] = [];

const oscillatorsReducer = (
  state: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
  },
  action: Oscillator_SettingsActions,
) => {
  const { oscillatorA, oscillatorB } = state;

  switch (action.type) {
    case Oscillator_ActionTypes.Create:
      {
        if (oscillatorA.isActive && oscillatorB.isActive) {
          const newOscillatorA = new Oscillator(
            audioContext,
            oscAGain,
            oscillatorA.type,
            action.payload.frequency,
            oscillatorA.detune,
            oscillatorA.adsr,
          );
          const newOscillatorB = new Oscillator(
            audioContext,
            oscBGain,
            oscillatorB.type,
            action.payload.frequency,
            oscillatorB.detune,
            oscillatorB.adsr,
          );
          currentOscillators.push(newOscillatorA, newOscillatorB);
        } else if (oscillatorA.isActive) {
          const newOscillator = new Oscillator(
            audioContext,
            oscAGain,
            oscillatorA.type,
            action.payload.frequency,
            oscillatorA.detune,
            oscillatorA.adsr,
          );
          currentOscillators.push(newOscillator);
        } else if (oscillatorB.isActive) {
          const newOscillator = new Oscillator(
            audioContext,
            oscBGain,
            oscillatorB.type,
            action.payload.frequency,
            oscillatorB.detune,
            oscillatorB.adsr,
          );
          currentOscillators.push(newOscillator);
        }
      }
      return { ...state };

    case Oscillator_ActionTypes.Kill:
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

    case Oscillator_ActionTypes.Activate:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id as keyof typeof state],
          isActive: true,
        },
      };

    case Oscillator_ActionTypes.Deactivate:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id as keyof typeof state],
          isActive: false,
        },
      };

    case Oscillator_ActionTypes.UpdateSettings:
      if (action.payload.parent === 'oscillatorA') {
        return {
          ...state,
          oscillatorA: {
            ...oscillatorA,
            [action.payload.id]: action.payload.value,
          },
        };
      } else {
        return {
          ...state,
          oscillatorB: {
            ...oscillatorB,
            [action.payload.id]: action.payload.value,
          },
        };
      }

    case Oscillator_ActionTypes.UpdateType:
      return { ...state, type: action.payload.id };

    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};

export default oscillatorsReducer;
