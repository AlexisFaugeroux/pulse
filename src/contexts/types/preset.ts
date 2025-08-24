import { Settings } from '../../types/types.ts';
import { ActionMap } from './helpers.ts';

enum Preset_SettingsActionTypes {
  Update = 'CHANGE_PRESET',
}

type Preset_SettingsPayload = {
  [key in Preset_SettingsActionTypes]: Settings;
};

type Preset_SettingsActions =
  ActionMap<Preset_SettingsPayload>[keyof ActionMap<Preset_SettingsPayload>];

export {
  Preset_SettingsActionTypes,
  type Preset_SettingsActions,
  type Preset_SettingsPayload,
};
