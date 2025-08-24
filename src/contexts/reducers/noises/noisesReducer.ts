import {
  Noise_SettingsActionTypes,
  Noise_SettingsActions,
} from '../../types/noises';
import type { NoisesState } from './types';
import { updateSettings } from './updateSettings';
import { updateType } from './updateType';

const noisesReducer = (
  state: NoisesState,
  action: Noise_SettingsActions,
): typeof state => {
  const { id } = action.payload;

  switch (action.type) {
    case Noise_SettingsActionTypes.Activate:
      if (!id) {
        console.error('Activate noise: no id provided');
        return state;
      }
      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: true },
      };
    case Noise_SettingsActionTypes.Deactivate:
      if (!id) {
        console.error('Deactivate noise: no id provided');
        return state;
      }
      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: false },
      };
    case Noise_SettingsActionTypes.UpdateSettings:
      return updateSettings(state, action);

    case Noise_SettingsActionTypes.UpdateType:
      return updateType(state, action);
    default:
      return state;
  }
};

export default noisesReducer;
