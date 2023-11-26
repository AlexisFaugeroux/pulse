import { InitialSettingsState } from '../../types/types';
import oscillatorsReducer from './oscillatorsReducer';

import { Gain_SettingsActions } from '../types';
import { type Oscillator_SettingsActions } from '../types/oscillator';
import gainsReducer from './gainsReducer';

export const mainReducer = (
  { oscillators, gains }: InitialSettingsState,
  action: Oscillator_SettingsActions | Gain_SettingsActions,
) => ({
  oscillators: oscillatorsReducer(
    oscillators,
    action as Oscillator_SettingsActions,
  ),
  gains: gainsReducer(gains, action as Gain_SettingsActions),
});
