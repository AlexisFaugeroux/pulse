import { getAudioGraph } from '../../../audio/audioGraph';
import { TIME_CONSTANT } from '../../../utils/constants';
import { roundTwoDigitsNonFinite } from '../../../utils/helpers';
import type { Oscillator_SettingsActions } from '../../types';
import { currentOscillators } from './oscillatorTriggerReducer';
import type { OscillatorState } from './types';

export function updateSettings(
  state: OscillatorState,
  action: Oscillator_SettingsActions,
): typeof state {
  const graph = getAudioGraph();
  if (!graph) {
    console.error(
      'Could not update noise settings, audio graph is not initialized',
    );
    return state;
  }

  const { id, parent, value: newValue } = action.payload;

  if (!id || newValue === undefined || !parent) {
    console.error(
      'Update oscillator settings: no id, value or parent component provided',
    );
    return state;
  }

  const {
    ctx,
    nodes: {oscAGain, oscBGain, subGain },
  } = graph;

  if (id === 'level') {
    if (parent === 'oscillatorA') {
      oscAGain.gain.setTargetAtTime(
        roundTwoDigitsNonFinite(newValue),
        ctx.currentTime,
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
        ctx.currentTime,
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
        ctx.currentTime,
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
              ctx.currentTime + 0.006,
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
