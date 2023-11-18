export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Oscillators_ActionTypes {
  Create = 'OSCA_START',
  Kill = 'OSCA_STOP',
  Activate = 'OSCA_ACTIVATE',
  Deactivate = 'OSCA_DEACTIVATE',
  UpdateSettings = 'OSCA_UPDATE__SETTINGS',
  UpdateType = 'OSCA_UPDATE_TYPE',
}

export type OscillatorSettingsPayload = {
  [Oscillators_ActionTypes.Create]: {
    note: string;
    frequency: number;
  };
  [Oscillators_ActionTypes.Kill]: {
    note: string;
    frequency: number;
  };
  [Oscillators_ActionTypes.Activate]: {
    id: string;
  };
  [Oscillators_ActionTypes.Deactivate]: {
    id: string;
  };
  [Oscillators_ActionTypes.UpdateSettings]: {
    id: string;
    value: number;
  };
  [Oscillators_ActionTypes.UpdateType]: {
    id: string;
  };
};

export type OscillatorSettingsActions =
  ActionMap<OscillatorSettingsPayload>[keyof ActionMap<OscillatorSettingsPayload>];
