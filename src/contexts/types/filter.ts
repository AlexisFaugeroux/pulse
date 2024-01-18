import { ActionMap } from './helpers';

enum Filter_ActionTypes {
  Activate = 'FILTER_ACTIVATE',
  Deactivate = 'FILTER_DEACTIVATE',
  UpdateSettings = 'FILTER_UPDATE_SETTINGS',
  UpdateType = 'FILTER_UPDATE_TYPE',
}

type Filter_SettingsPayload = {
  [key in Filter_ActionTypes]: {
    id?: string;
    value?: number;
  };
};

type Filter_SettingsActions =
  ActionMap<Filter_SettingsPayload>[keyof ActionMap<Filter_SettingsPayload>];

export {
  Filter_ActionTypes,
  type Filter_SettingsActions,
  type Filter_SettingsPayload,
};
