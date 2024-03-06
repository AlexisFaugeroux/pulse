import { ActionMap } from './helpers';

enum Distortion_ActionTypes {
  ActivateClipping = 'CLIPPING_ACTIVATE',
  DeactivateClipping = 'CLIPPING_DEACTIVATE',
  UpdateSettingsClipping = 'CLIPPING_UPDATE_SETTINGS',
  ActivateBitcrusher = 'BITCRUSHER_ACTIVATE',
  DeactivateBitcrusher = 'BITCRUSHER_DEACTIVATE',
  UpdateSettingsBitcrusher = 'BITCRUSHER_UPDATE_SETTINGS',
  UpdateType = 'DISTORTION_UPDATE_TYPE',
}

type Distortion_SettingsPayload = {
  [key in Distortion_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Distortion_SettingsActions =
  ActionMap<Distortion_SettingsPayload>[keyof ActionMap<Distortion_SettingsPayload>];

export {
  Distortion_ActionTypes,
  type Distortion_SettingsActions,
  type Distortion_SettingsPayload,
};
