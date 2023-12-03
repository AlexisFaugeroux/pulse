import { ActionMap } from './helpers.ts';

enum Oscillator_ActionTypes {
  Create = 'OSC_START',
  Kill = 'OSC_STOP',
  Activate = 'OSC_ACTIVATE',
  Deactivate = 'OSC_DEACTIVATE',
  UpdateSettings = 'OSC_UPDATE_SETTINGS',
  UpdateType = 'OSC_UPDATE_TYPE',
}

type Oscillator_SettingsPayload = {
  [key in Oscillator_ActionTypes]: {
    id?: string;
    note?: string;
    frequency?: number;
    parent?: string;
    value?: number;
  };
};

type Oscillator_SettingsActions =
  ActionMap<Oscillator_SettingsPayload>[keyof ActionMap<Oscillator_SettingsPayload>];

export {
  Oscillator_ActionTypes,
  type Oscillator_SettingsActions,
  type Oscillator_SettingsPayload,
};
