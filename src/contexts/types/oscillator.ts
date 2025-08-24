import { ActionMap } from './helpers.ts';

enum Oscillator_TriggerActionsTypes {
  Create = 'OSC_START',
  Kill = 'OSC_STOP',
  CreateNoise = 'NOISE_CREATE_NOISE',
  KillNoise = 'NOISE_KILL_NOISE',
}

enum Oscillator_SettingsActionTypes {
  Activate = 'OSC_ACTIVATE',
  Deactivate = 'OSC_DEACTIVATE',
  UpdateSettings = 'OSC_UPDATE_SETTINGS',
  UpdateType = 'OSC_UPDATE_TYPE',
}

type Oscillator_TriggerPayload = {
  [key in Oscillator_TriggerActionsTypes]: {
    note?: string;
    frequency?: number;
  };
};

type Oscillator_SettingsPayload = {
  [key in Oscillator_SettingsActionTypes]: {
    id?: string;
    parent?: string;
    value?: number;
  };
};

type Oscillator_TriggerActions =
  ActionMap<Oscillator_TriggerPayload>[keyof ActionMap<Oscillator_TriggerPayload>];

type Oscillator_SettingsActions =
  ActionMap<Oscillator_SettingsPayload>[keyof ActionMap<Oscillator_SettingsPayload>];

export {
  Oscillator_SettingsActionTypes,
  Oscillator_TriggerActionsTypes,
  type Oscillator_SettingsActions,
  type Oscillator_SettingsPayload,
  type Oscillator_TriggerActions,
  type Oscillator_TriggerPayload,
};

export interface Action<T, P> {
  type: T;
  payload: P;
}
