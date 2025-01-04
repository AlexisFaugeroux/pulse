import { ActionMap } from "./helpers";

enum Keyboard_ActionTypes {
  UpdateSettings = 'KEYBOARD_UPDATE_SETTINGS',
}

type Keyboard_SettingsPayload = {
  [key in Keyboard_ActionTypes]: {
    offset: number;
  };
};

type Keyboard_SettingsActions =
  ActionMap<Keyboard_SettingsPayload>[keyof ActionMap<Keyboard_SettingsPayload>];

export {
  Keyboard_ActionTypes,
  type Keyboard_SettingsActions,
  type Keyboard_SettingsPayload,
};
