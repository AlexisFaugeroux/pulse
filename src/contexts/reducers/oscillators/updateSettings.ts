import { audioContext, oscAGain, oscBGain, subGain } from '../../../nodesConfig';
import { TIME_CONSTANT } from '../../../utils/constants';
import { roundTwoDigitsNonFinite } from '../../../utils/helpers';
import type { Oscillator_SettingsActions } from '../../types';
import { currentOscillators } from './oscillatorTriggerReducer';
import type { OscillatorState } from './types';

export function updateSettings(
  state: OscillatorState,
  action: Oscillator_SettingsActions,
): typeof state {
  const { id, parent, value: newValue } = action.payload;

  if (!id || newValue === undefined || !parent) {
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
        oscillatorA: {
          ...state.oscillatorA,
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
        oscillatorB: {
          ...state.oscillatorB,
          gain: newValue,
        },
      };
    } else if (parent === 'subOscillator') {
      subGain.gain.setTargetAtTime(
        roundTwoDigitsNonFinite(newValue),
        audioContext.currentTime,
        TIME_CONSTANT,
      );
      return {
        ...state,
        subOscillator: {
          ...state.subOscillator,
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
          const { frequency: newFrequency } = octaveShift(newValue, frequency);

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
}
