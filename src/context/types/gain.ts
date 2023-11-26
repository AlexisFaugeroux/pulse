import { ActionMap } from './helpers.ts';

enum Gain_ActionTypes {
  UpdateSettings = 'GAIN_UPDATE_SETTINGS',
}

type Gain_SettingsPayload = {
  [Gain_ActionTypes.UpdateSettings]: {
    id: string;
    parent: string;
    value: number;
  };
};

type Gain_SettingsActions =
  ActionMap<Gain_SettingsPayload>[keyof ActionMap<Gain_SettingsPayload>];

export {
  Gain_ActionTypes,
  type Gain_SettingsActions,
  type Gain_SettingsPayload,
};
