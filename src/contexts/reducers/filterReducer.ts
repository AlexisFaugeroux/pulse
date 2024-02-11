import { filter } from '../../nodesConfig';
import { FilterSettings } from '../../types/types';
import { Filter_ActionTypes, Filter_SettingsActions } from '../types';

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

    case Filter_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!value) return { ...state };

      if (id === 'cutoff') {
        filter.setFrequency(value);
        return { ...state, frequency: value };
      }

      if (id === 'Q') {
        filter.setQ(value);
        return { ...state, Q: value };
      }

      if (id === 'gain') {
        filter.setGain(value);
        return { ...state, gain: value };
      }
      return { ...state };
    }
    case Filter_ActionTypes.UpdateType: {
      const { id } = action.payload;
      if (!id) throw new Error('Update filter: no property id provided');

      filter.setType(id as BiquadFilterType);
      return { ...state };
    }

    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default filterReducer;
