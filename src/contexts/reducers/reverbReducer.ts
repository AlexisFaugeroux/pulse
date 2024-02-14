import { audioContext, reverb } from '../../nodesConfig';
import { ReverbSettings } from '../../types/types';
import { Reverb_ActionTypes, Reverb_SettingsActions } from '../types';

const reverbReducer = (
  state: ReverbSettings,
  action: Reverb_SettingsActions,
): ReverbSettings => {
  const { node } = reverb;

  switch (action.type) {
    case Reverb_ActionTypes.Activate:
      reverb.activate({ dryValue: 1 - state.wetGain, wetValue: state.wetGain });

      return {
        ...state,
        dryGain: 1 - state.wetGain,
        isActive: true,
      };

    case Reverb_ActionTypes.Deactivate:
      reverb.deactivate();

      return { ...state, dryGain: 1, isActive: false };

    case Reverb_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'time') {
        reverb.setImpulseResponse(audioContext, node, value, state.decay);

        return { ...state, time: value };
      }

      if (id === 'decay') {
        reverb.setImpulseResponse(audioContext, node, state.time, value);

        return { ...state, decay: value };
      }

      if (id === 'mix' && state.isActive) {
        const newDryValue = 1 - value;
        reverb.setDryGain(newDryValue);
        reverb.setWetGain(value);

        return {
          ...state,
          dryGain: newDryValue,
          wetGain: value,
        };
      }
      return { ...state };
    }
    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default reverbReducer;
