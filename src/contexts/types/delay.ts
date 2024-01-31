import { ActionMap } from './helpers';

enum Delay_ActionTypes {
  Activate = 'Delay_ACTIVATE',
  Deactivate = 'Delay_DEACTIVATE',
  UpdateSettings = 'Delay_UPDATE_SETTINGS',
}

type Delay_SettingsPayload = {
  [key in Delay_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Delay_SettingsActions =
  ActionMap<Delay_SettingsPayload>[keyof ActionMap<Delay_SettingsPayload>];

export {
  Delay_ActionTypes,
  type Delay_SettingsActions,
  type Delay_SettingsPayload,
};
