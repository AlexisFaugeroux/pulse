import { ActionMap } from './helpers';

enum Reverb_ActionTypes {
  Activate = 'REVERB_ACTIVATE',
  Deactivate = 'REVERB_DEACTIVATE',
  UpdateSettings = 'REVERB_UPDATE_SETTINGS',
}

type Reverb_SettingsPayload = {
  [key in Reverb_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Reverb_SettingsActions =
  ActionMap<Reverb_SettingsPayload>[keyof ActionMap<Reverb_SettingsPayload>];

export {
  Reverb_ActionTypes,
  type Reverb_SettingsActions,
  type Reverb_SettingsPayload,
};
