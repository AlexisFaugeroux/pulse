import { ActionMap } from './helpers';

enum Chorus_ActionTypes {
  Activate = 'CHORUS_ACTIVATE',
  Deactivate = 'CHORUS_DEACTIVATE',
  UpdateSettings = 'CHORUS_UPDATE_SETTINGS',
}

type Chorus_SettingsPayload = {
  [key in Chorus_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Chorus_SettingsActions =
  ActionMap<Chorus_SettingsPayload>[keyof ActionMap<Chorus_SettingsPayload>];

export {
  Chorus_ActionTypes,
  type Chorus_SettingsActions,
  type Chorus_SettingsPayload
};

