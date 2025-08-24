import { filter } from '../../../nodesConfig';
import { FilterSettings } from '../../../types/types';
import { Filter_ActionTypes, Filter_SettingsActions } from '../../types';
import { updateSettings } from './updateSettings';
import { updateType } from './updateType';

const filterReducer = (
  state: FilterSettings,
  action: Filter_SettingsActions,
): FilterSettings => {
  switch (action.type) {
    case Filter_ActionTypes.Activate:
      filter.activate({ dryValue: 0, wetValue: state.wetGain });
      return { ...state, dryGain: 0, isActive: true };

    case Filter_ActionTypes.Deactivate:
      filter.deactivate();
      return { ...state, dryGain: 1, isActive: false };

    case Filter_ActionTypes.UpdateSettings:
      return updateSettings(state, action);
    case Filter_ActionTypes.UpdateType:
      return updateType(state, action);

    default:
      console.error('Reducer error action', action);
      return { ...state };
  }
};

export default filterReducer;
