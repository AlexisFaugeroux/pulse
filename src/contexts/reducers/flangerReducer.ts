import { FlangerSettings } from '../../types/types';
import { Flanger_ActionTypes, Flanger_SettingsActions } from '../types';

const flangerReducer = (
  state: FlangerSettings,
  action: Flanger_SettingsActions,
): FlangerSettings => {
  switch (action.type) {
    case Flanger_ActionTypes.Activate:
      return { ...state };

    case Flanger_ActionTypes.Deactivate:
      return { ...state };

    case Flanger_ActionTypes.UpdateSettings:
      return { ...state };

    default:
      break;
  }
  return { ...state };
};

export default flangerReducer;
