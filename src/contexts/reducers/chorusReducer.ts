import { ChorusSettings } from '../../types/types';
import { Chorus_ActionTypes, Chorus_SettingsActions } from '../types';

const chorusReducer = (
  state: ChorusSettings,
  action: Chorus_SettingsActions,
): ChorusSettings => {
  switch (action.type) {
    case Chorus_ActionTypes.Activate:
      return { ...state };

    case Chorus_ActionTypes.Deactivate:
      return { ...state };

    case Chorus_ActionTypes.UpdateSettings:
      return { ...state };

    default:
      break;
  }
  return { ...state };
};

export default chorusReducer;
