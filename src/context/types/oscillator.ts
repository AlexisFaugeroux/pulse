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
  [Oscillator_ActionTypes.Create]: {
    note: string;
    frequency: number;
  };
  [Oscillator_ActionTypes.Kill]: {
    note: string;
    frequency: number;
  };
  [Oscillator_ActionTypes.Activate]: {
    id: string;
  };
  [Oscillator_ActionTypes.Deactivate]: {
    id: string;
  };
  [Oscillator_ActionTypes.UpdateSettings]: {
    id: string;
    parent: string;
    value: number;
  };
  [Oscillator_ActionTypes.UpdateType]: {
    id: string;
  };
};

type Oscillator_SettingsActions =
  ActionMap<Oscillator_SettingsPayload>[keyof ActionMap<Oscillator_SettingsPayload>];

export {
  Oscillator_ActionTypes,
  type Oscillator_SettingsActions,
  type Oscillator_SettingsPayload,
};
