import { ActionMap } from './helpers.ts';

enum Noise_SettingsActionTypes {
  Activate = 'NOISE_ACTIVATE',
  Deactivate = 'NOISE_DEACTIVATE',
  UpdateSettings = 'NOISE_UPDATE_SETTINGS',
  UpdateType = 'NOISE_UPDATE_TYPE',
}

type Noise_SettingsPayload = {
  [key in Noise_SettingsActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Noise_SettingsActions =
  ActionMap<Noise_SettingsPayload>[keyof ActionMap<Noise_SettingsPayload>];

export {
  Noise_SettingsActionTypes,
  type Noise_SettingsActions,
  type Noise_SettingsPayload,
};
