import { ActionMap } from './helpers';

enum Envelope_ActionTypes {
  Activate = 'ENVELOPE_ACTIVATE',
  Deactivate = 'ENVELOPE_DEACTIVATE',
  UpdateSettings = 'ENVELOPE_UPDATE_SETTINGS',
}

type Envelope_SettingsPayload = {
  [key in Envelope_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Envelope_SettingsActions =
  ActionMap<Envelope_SettingsPayload>[keyof ActionMap<Envelope_SettingsPayload>];

export {
  Envelope_ActionTypes,
  type Envelope_SettingsActions,
  type Envelope_SettingsPayload,
};
