import { audioContext, filter } from '../../nodesConfig';
import { FilterSettings } from '../../types/types';
import { Filter_ActionTypes, Filter_SettingsActions } from '../types';
import {
  TIME_CONSTANT,
  linearToLinearRange,
  linearToLogarithmRange,
  roundTwoDigitsNonFinite,
} from './helpers';

const filterReducer = (
  state: FilterSettings,
  action: Filter_SettingsActions,
): FilterSettings => {
  const { currentTime } = audioContext;
  const { node, dryGain, wetGain, mixGain } = filter;

  switch (action.type) {
    case Filter_ActionTypes.Activate:
      wetGain.connect(mixGain);
      dryGain.gain.setTargetAtTime(0, currentTime, TIME_CONSTANT);

      return { ...state, dryGain: 0, isActive: true };

    case Filter_ActionTypes.Deactivate:
      wetGain.disconnect();
      dryGain.gain.setTargetAtTime(1, currentTime, TIME_CONSTANT);

      return { ...state, dryGain: 1, isActive: false };

    case Filter_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!value) return { ...state };

      if (id === 'cutoff') {
        const convertedValue = linearToLogarithmRange({
          base: 20,
          value: value,
          linearRange: [0, 1],
          logarithmicRange: [20, 20000],
        });

        node.frequency.setTargetAtTime(
          roundTwoDigitsNonFinite(convertedValue),
          currentTime,
          TIME_CONSTANT,
        );
      } else if (id === 'Q') {
        node.Q.setTargetAtTime(
          value * 1000, // Q nominal range is 0.0001 to 1000
          currentTime,
          TIME_CONSTANT,
        );
      } else if (id === 'gain') {
        const convertedValue = linearToLinearRange(value, [-40, 40]);

        node.gain.setTargetAtTime(
          convertedValue,
          audioContext.currentTime,
          TIME_CONSTANT,
        );
      }
      return { ...state };
    }
    case Filter_ActionTypes.UpdateType: {
      const { id } = action.payload;
      if (!id) throw new Error('Update filter: no property id provided');

      node.type = id as BiquadFilterType;
      return { ...state };
    }

    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default filterReducer;
