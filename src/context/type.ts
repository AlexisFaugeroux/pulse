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

export enum OscillatorA_ActionTypes {
  Create = 'OSCA_START',
  Kill = 'OSCA_STOP',
  UpdateSettings = 'OSCA_UPDATE__SETTINGS',
  UpdateType = 'OSCA_UPDATE_TYPE',
}

export type OscillatorSettingsPayload = {
  [OscillatorA_ActionTypes.Create]: {
    note: string;
    frequency: number;
  };
  [OscillatorA_ActionTypes.Kill]: {
    note: string;
    frequency: number;
  };
  [OscillatorA_ActionTypes.UpdateSettings]: {
    id: string;
    value: number;
  };
  [OscillatorA_ActionTypes.UpdateType]: {
    id: string;
  };
};

export type OscillatorASettingsActions =
  ActionMap<OscillatorSettingsPayload>[keyof ActionMap<OscillatorSettingsPayload>];
