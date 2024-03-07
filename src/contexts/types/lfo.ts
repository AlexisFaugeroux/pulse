import { LFOMode } from '../../utils/constants.ts';
import { ActionMap } from './helpers.ts';

enum LFO_SettingsActionTypes {
  Activate = 'LFO_ACTIVATE',
  Deactivate = 'LFO_DEACTIVATE',
  UpdateSettings = 'LFO_UPDATE_SETTINGS',
  UpdateMode = 'LFO_UPDATE_MODE',
  UpdateType = 'LFO_UPDATE_TYPE',
}

type LFO_SettingsPayload = {
  [key in LFO_SettingsActionTypes]: {
    id?: string;
    mode?: LFOMode;
    value?: number;
  };
};

type LFO_SettingsActions =
  ActionMap<LFO_SettingsPayload>[keyof ActionMap<LFO_SettingsPayload>];

export {
  LFO_SettingsActionTypes,
  type LFO_SettingsActions,
  type LFO_SettingsPayload,
};
