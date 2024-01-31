import {
  audioContext,
  delayDryGain,
  filter,
  masterGain,
  oscAGain,
  oscBGain,
} from '../../nodesConfig';
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
) => {
  switch (action.type) {
    case Filter_ActionTypes.Activate:
      oscAGain.disconnect();
      oscBGain.disconnect();
      oscBGain.connect(filter);
      oscAGain.connect(filter);

      filter.connect(masterGain);
      filter.connect(delayDryGain);

      return { ...state, isActive: true };

    case Filter_ActionTypes.Deactivate:
      // TODO: use gain nodes to handle activation/deactivation of filter
      // oscAGain.disconnect();
      // oscBGain.disconnect();

      // oscAGain.connect(masterGain);
      // oscBGain.connect(masterGain);

      filter.disconnect();

      return { ...state, isActive: false };

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

        filter.frequency.setTargetAtTime(
          roundTwoDigitsNonFinite(convertedValue),
          audioContext.currentTime,
          TIME_CONSTANT,
        );
      } else if (id === 'Q') {
        filter.Q.setTargetAtTime(
          value * 1000, // Q nominal range is 0.0001 to 1000
          audioContext.currentTime,
          TIME_CONSTANT,
        );
      } else if (id === 'mix') {
        const convertedValue = linearToLinearRange(value, [-40, 40]);

        filter.gain.setTargetAtTime(
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

      filter.type = id as BiquadFilterType;
      return { ...state };
    }

    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default filterReducer;
