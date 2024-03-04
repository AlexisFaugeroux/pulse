import { ActionMap } from './helpers';

enum Compressor_ActionTypes {
  Activate = 'COMPRESSOR_ACTIVATE',
  Deactivate = 'COMPRESSOR_DEACTIVATE',
  UpdateSettings = 'COMPRESSOR_UPDATE_SETTINGS',
}

type Compressor_SettingsPayload = {
  [key in Compressor_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Compressor_SettingsActions =
  ActionMap<Compressor_SettingsPayload>[keyof ActionMap<Compressor_SettingsPayload>];

export {
  Compressor_ActionTypes,
  type Compressor_SettingsActions,
  type Compressor_SettingsPayload,
};
