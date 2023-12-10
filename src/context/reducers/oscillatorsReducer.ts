import { audioContext } from '../../nodesConfig';
import { OscSettings } from '../../types/types';
import {
  Oscillator_SettingsActionTypes,
  type Oscillator_SettingsActions,
} from '../types/index';
import { currentOscillators } from './oscillatorTriggerReducer';

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
  const { id, parent, value: newValue } = action.payload;

  switch (action.type) {
    case Oscillator_SettingsActionTypes.Activate:
      if (!id) {
        console.error('Activate oscillator: no id provided');
        return { ...state };
      }

      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: true },
      };

    case Oscillator_SettingsActionTypes.Deactivate:
      if (!id) {
        console.error('Deactivate oscillator: no id provided');
        return { ...state };
      }

      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: false },
      };

    case Oscillator_SettingsActionTypes.UpdateSettings:
      if (!id) {
        console.error('Update oscillator settings: no id provided');
        return { ...state };
      }

      if (parent) {
        currentOscillators.forEach(
          ({ node, parent: currOscParent, offset, frequency, octaveShift }) => {
            if (id === 'detune' && currOscParent === parent) {
              node.detune.value = newValue ? newValue * 100 : 0;
            }
            if (id === 'octaveOffset' && currOscParent === parent) {
              const { frequency: newFrequency } = octaveShift(
                newValue ?? offset,
                frequency,
              );

              if (newFrequency !== node.frequency.value) {
                node.frequency.setValueAtTime(
                  newFrequency,
                  audioContext.currentTime + 0.006,
                );
              }
            }
          },
        );
        return {
          ...state,
          [parent]: {
            ...state[parent as keyof typeof state],
            [id]: newValue,
          },
        };
      } else {
        return { ...state };
      }

    case Oscillator_SettingsActionTypes.UpdateType:
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
