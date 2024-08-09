import { chorus } from '../../nodesConfig';
import { ChorusSettings } from '../../types/types';
import { Chorus_ActionTypes, Chorus_SettingsActions } from '../types';

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

    case Chorus_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'rate') {
        chorus.setRate(value);
        return { ...state, rate: value };
      }
      if (id === 'feedback') {
        chorus.setFeedback(value);
        return { ...state, feedback: value };
      }
      if (id === 'depth') {
        chorus.setDepth(value);
        return { ...state, depth: value };
      }
      if (id === 'time') {
        chorus.setDelay(value);
        return { ...state, time: value };
      }
      if (id === 'phase') {
        chorus.setStereoPhase(value);
        return { ...state, stereoPhase: value };
      }

      if (id === 'mix' && state.isActive) {
        const newDryValue = 1 - value;
        chorus.setDryGain(newDryValue);
        chorus.setWetGain(value);

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

export default chorusReducer;
