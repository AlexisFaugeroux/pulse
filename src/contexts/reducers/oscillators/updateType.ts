import { getAudioNode } from '../../../audio/audioGraph';
import type { Oscillator_SettingsActions } from '../../types';
import { OscillatorState } from './types';

export function updateType(
  state: OscillatorState,
  action: Oscillator_SettingsActions,
): typeof state {
  const activeOscillators = getAudioNode('activeOscillators');
  if (!activeOscillators) {
    console.error("Could not update oscillator type, audio graph is not initialized");
    return state;
  }
  const { oscillatorA, oscillatorB, subOscillator } = state;
  const { id, parent } = action.payload;

  if (!id) {
    console.error('Update oscillator type: no id provided');
    return state;
  }

  if (parent === 'oscillatorA') {
    activeOscillators.forEach(({ node, parent: currOscParent }) => {
      if (currOscParent === parent) {
        node.type = id as OscillatorType;
      }
    });

    return {
      ...state,
      oscillatorA: { ...oscillatorA, type: id as OscillatorType },
    };
  } else if (parent === 'oscillatorB') {
    activeOscillators.forEach(({ node, parent: currOscParent }) => {
      if (currOscParent === parent) {
        node.type = id as OscillatorType;
      }
    });
    return {
      ...state,
      oscillatorB: { ...oscillatorB, type: id as OscillatorType },
    };
  } else if (parent === 'subOscillator') {
    activeOscillators.forEach(({ node, parent: currOscParent }) => {
      if (currOscParent === parent) {
        node.type = id as OscillatorType;
      }
    });
    return {
      ...state,
      subOscillator: { ...subOscillator, type: id as OscillatorType },
    };
  } else {
    return state;
  }
}
