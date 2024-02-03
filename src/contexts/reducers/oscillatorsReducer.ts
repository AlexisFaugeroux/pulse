import { audioContext, oscAGain, oscBGain } from '../../nodesConfig';
import { OscSettings } from '../../types/types';
import {
  Oscillator_SettingsActionTypes,
  type Oscillator_SettingsActions,
} from '../types';
import { TIME_CONSTANT, roundTwoDigitsNonFinite } from './helpers';
import { currentOscillators } from './oscillatorTriggerReducer';

const oscillatorsReducer = (
  state: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
  },
  action: Oscillator_SettingsActions,
): typeof state => {
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
      if (!id || !newValue || !parent) {
        console.error(
          'Update oscillator settings: no id, value or parent component provided',
        );
        return { ...state };
      }

      if (id === 'level') {
        if (parent === 'oscillatorA') {
          oscAGain.gain.setTargetAtTime(
            roundTwoDigitsNonFinite(newValue),
            audioContext.currentTime,
            TIME_CONSTANT,
          );
          return {
            ...state,
            [parent]: {
              ...state[parent],
              gain: newValue,
            },
          };
        } else if (parent === 'oscillatorB') {
          oscBGain.gain.setTargetAtTime(
            roundTwoDigitsNonFinite(newValue),
            audioContext.currentTime,
            TIME_CONSTANT,
          );
          return {
            ...state,
            [parent]: {
              ...state[parent],
              gain: newValue,
            },
          };
        }
      }

      if (currentOscillators.length > 0) {
        currentOscillators.forEach(
          ({ node, parent: currOscParent, frequency, octaveShift }) => {
            if (id === 'detune' && currOscParent === parent) {
              node.detune.value = newValue * 100;
            }
            if (id === 'octaveOffset' && currOscParent === parent) {
              const { frequency: newFrequency } = octaveShift(
                newValue,
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
      }

      return {
        ...state,
        [parent]: {
          ...state[parent as keyof typeof state],
          [id]: newValue,
        },
      };

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
