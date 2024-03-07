import { ActionMap } from './helpers';

enum Flanger_ActionTypes {
  Activate = 'FLANGER_ACTIVATE',
  Deactivate = 'FLANGER_DEACTIVATE',
  UpdateSettings = 'FLANGER_UPDATE_SETTINGS',
}

type Flanger_SettingsPayload = {
  [key in Flanger_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Flanger_SettingsActions =
  ActionMap<Flanger_SettingsPayload>[keyof ActionMap<Flanger_SettingsPayload>];

export {
  Flanger_ActionTypes,
  type Flanger_SettingsActions,
  type Flanger_SettingsPayload,
};
