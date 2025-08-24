import { chorus } from '../../../nodesConfig';
import { ChorusSettings } from '../../../types/types';
import { Chorus_ActionTypes, Chorus_SettingsActions } from '../../types';
import { updateSettings } from './updateSettings';

const chorusReducer = (
  state: ChorusSettings,
  action: Chorus_SettingsActions,
): ChorusSettings => {
  switch (action.type) {
    case Chorus_ActionTypes.Activate:
      chorus.activate({ dryValue: 1 - state.wetGain, wetValue: state.wetGain });

      return { ...state, dryGain: 1 - state.wetGain, isActive: true };

    case Chorus_ActionTypes.Deactivate:
      chorus.deactivate();
      return { ...state, dryGain: 1 - state.wetGain, isActive: false };

    case Chorus_ActionTypes.UpdateSettings:
      return updateSettings(state, action);
    default:
      console.error('Reducer error action', action);
      return { ...state };
  }
};

export default chorusReducer;
