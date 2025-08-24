import { ActionMap } from './helpers';

enum Phaser_ActionTypes {
  Activate = 'PHASER_ACTIVATE',
  Deactivate = 'PHASER_DEACTIVATE',
  UpdateSettings = 'PHASER_UPDATE_SETTINGS',
}

type Phaser_SettingsPayload = {
  [key in Phaser_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Phaser_SettingsActions =
  ActionMap<Phaser_SettingsPayload>[keyof ActionMap<Phaser_SettingsPayload>];

export {
  Phaser_ActionTypes,
  type Phaser_SettingsActions,
  type Phaser_SettingsPayload,
};
