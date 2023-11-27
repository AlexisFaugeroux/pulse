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
): {
  oscillatorA: OscSettings;
  oscillatorB: OscSettings;
} => {
  const { oscillatorA, oscillatorB } = state;
  const { id, frequency, parent, value } = action.payload;

  switch (action.type) {
    case Oscillator_ActionTypes.Create:
      {
        if (oscillatorA.isActive && oscillatorB.isActive) {
          const newOscillatorA = new Oscillator(
            audioContext,
            oscAGain,
            oscillatorA.type,
            frequency ?? 0,
            oscillatorA.detune,
            oscillatorA.adsr,
            oscillatorA.id,
          );
          const newOscillatorB = new Oscillator(
            audioContext,
            oscBGain,
            oscillatorB.type,
            frequency ?? 0,
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
            frequency ?? 0,
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
            frequency ?? 0,
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
            Math.round(frequency ?? 0)
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
      if (!id) {
        console.error('Activate oscillator: no id provided');
        return { ...state };
      }

      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: true },
      };

    case Oscillator_ActionTypes.Deactivate:
      if (!id) {
        console.error('Deactivate oscillator: no id provided');
        return { ...state };
      }

      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: false },
      };

    case Oscillator_ActionTypes.UpdateSettings:
      if (!id) {
        console.error('Update oscillator settings: no id provided');
        return { ...state };
      }

      if (parent === 'oscillatorA') {
        currentOscillators.forEach(({ node, parent: currOscParent }) => {
          if (id === 'detune' && currOscParent === parent) {
            console.log(value);
            node.detune.value = value ? value * 100 : 0;
          }
        });

        return {
          ...state,
          oscillatorA: { ...oscillatorA, [id]: value },
        };
      } else if (parent === 'oscillatorB') {
        currentOscillators.forEach(({ node, parent: currOscParent }) => {
          if (id === 'detune' && currOscParent === parent) {
            node.detune.value = value ? value * 100 : 0;
          }
        });
        return {
          ...state,
          oscillatorB: { ...oscillatorB, [id]: value },
        };
      } else {
        return { ...state };
      }

    case Oscillator_ActionTypes.UpdateType:
      if (!id) {
        console.error('Update oscillator type: no id provided');
        return { ...state };
      }

      if (parent === 'oscillatorA') {
        currentOscillators.forEach(({ node, parent: currOscParent }) => {
          if (currOscParent === parent) {
            node.type = id as OscillatorType;
          }
        });

        return {
          ...state,
          oscillatorA: { ...oscillatorA, type: id as OscillatorType },
        };
      } else if (parent === 'oscillatorB') {
        currentOscillators.forEach(({ node, parent: currOscParent }) => {
          if (currOscParent === parent) {
            node.type = id as OscillatorType;
          }
        });
        return {
          ...state,
          oscillatorB: { ...oscillatorB, type: id as OscillatorType },
        };
      } else {
        return { ...state };
      }

    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};
export default oscillatorsReducer;
