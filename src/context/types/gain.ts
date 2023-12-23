import { ActionMap } from './helpers';

enum Gain_ActionTypes {
  UpdateSettings = 'GAIN_UPDATE_SETTINGS',
}

type Gain_SettingsPayload = {
  [key in Gain_ActionTypes]: {
    value: number;
    parent: string;
  };
};

type Gain_SettingsActions =
  ActionMap<Gain_SettingsPayload>[keyof ActionMap<Gain_SettingsPayload>];

export {
  Gain_ActionTypes,
  type Gain_SettingsActions,
  type Gain_SettingsPayload,
};
