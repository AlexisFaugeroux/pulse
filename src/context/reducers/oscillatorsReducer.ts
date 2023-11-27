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
            oscillatorA.id,
          );
          const newOscillatorB = new Oscillator(
            audioContext,
            oscBGain,
            oscillatorB.type,
            action.payload.frequency,
            oscillatorB.detune,
            oscillatorB.adsr,
            oscillatorB.id,
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
            oscillatorA.id,
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
            oscillatorB.id,
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

    case Oscillator_ActionTypes.Activate: {
      const { id } = action.payload;
      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: true },
      };
    }

    case Oscillator_ActionTypes.Deactivate: {
      const { id } = action.payload;

      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: false },
      };
    }

    case Oscillator_ActionTypes.UpdateSettings: {
      const { id, value, parent } = action.payload;

      if (parent === 'oscillatorA') {
        currentOscillators.forEach((oscillator) => {
          if (id === 'detune' && oscillator.parent === parent) {
            oscillator.node.detune.value = value * 100;
          }
        });
        return {
          ...state,
          oscillatorA: { ...oscillatorA, [id]: value },
        };
      } else if (parent === 'oscillatorB') {
        currentOscillators.forEach((oscillator) => {
          if (id === 'detune' && oscillator.parent === parent) {
            oscillator.node.detune.value = value * 100;
          }
        });
        return {
          ...state,
          oscillatorB: { ...oscillatorB, [id]: value },
        };
      } else {
        return { ...state };
      }
    }

    case Oscillator_ActionTypes.UpdateType:
      return { ...state, type: action.payload.id };

    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};

export default oscillatorsReducer;
