import type { Oscillator_SettingsActions } from '../../types';
import { currentOscillators } from './oscillatorTriggerReducer';
import { OscillatorState } from './types';

export function updateType(
  state: OscillatorState,
  action: Oscillator_SettingsActions,
): typeof state {
  const { oscillatorA, oscillatorB, subOscillator } = state;
  const { id, parent } = action.payload;

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
  } else if (parent === 'subOscillator') {
    currentOscillators.forEach(({ node, parent: currOscParent }) => {
      if (currOscParent === parent) {
        node.type = id as OscillatorType;
      }
    });
    return {
      ...state,
      subOscillator: { ...subOscillator, type: id as OscillatorType },
    };
  } else {
    return { ...state };
  }
}
