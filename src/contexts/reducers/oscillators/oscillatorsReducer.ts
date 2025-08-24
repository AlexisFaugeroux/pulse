import {
  Oscillator_SettingsActionTypes,
  type Oscillator_SettingsActions,
} from '../../types';
import { activate } from '../oscillators/activate';
import { deactivate } from '../oscillators/deactivate';
import { updateSettings } from '../oscillators/updateSettings';
import { updateType } from '../oscillators/updateType';
import type { OscillatorState } from './types';

const oscillatorsReducer = (
  state: OscillatorState,
  action: Oscillator_SettingsActions,
): typeof state => {
  switch (action.type) {
    case Oscillator_SettingsActionTypes.Activate:
      return activate(state, action);

    case Oscillator_SettingsActionTypes.Deactivate:
      return deactivate(state, action);

    case Oscillator_SettingsActionTypes.UpdateSettings:
      return updateSettings(state, action);

    case Oscillator_SettingsActionTypes.UpdateType:
      return updateType(state, action);

    default:
      console.error('Reducer error action: ', action);
      return state;
  }
};

export default oscillatorsReducer;
