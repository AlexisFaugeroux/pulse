import type { Oscillator_SettingsActions } from '../../types';
import type { OscillatorState } from './types';

export function deactivate(
  state: OscillatorState,
  action: Oscillator_SettingsActions,
): typeof state {
  const { id } = action.payload;

  if (!id) {
    console.error('Deactivate oscillator: no id provided');
    return { ...state };
  }

  return {
    ...state,
    [id]: { ...state[id as keyof typeof state], isActive: false },
  };
}
