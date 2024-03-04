import { compressor } from '../../nodesConfig';
import { CompressorSettings } from '../../types/types';
import {
  Compressor_ActionTypes,
  Compressor_SettingsActions,
} from '../types/compressor';

const compressorReducer = (
  state: CompressorSettings,
  action: Compressor_SettingsActions,
): CompressorSettings => {
  switch (action.type) {
    case Compressor_ActionTypes.Activate:
      compressor.activate({
        dryValue: 1 - state.wetGain,
        wetValue: state.wetGain,
      });

      return {
        ...state,
        dryGain: 1 - state.wetGain,
        isActive: true,
      };

    case Compressor_ActionTypes.Deactivate:
      compressor.deactivate();

      return { ...state, dryGain: 1, isActive: false };

    case Compressor_ActionTypes.UpdateSettings:
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'mix' && state.isActive) {
        const newDryValue = 1 - value;
        compressor.setDryGain(newDryValue);
        compressor.setWetGain(value);

        return { ...state, dryGain: newDryValue, wetGain: value };
      }

      if (id === 'thresh.') {
        compressor.setThreshold(value);
        return { ...state, threshold: value };
      }

      if (id === 'ratio') {
        compressor.setRatio(value);
        return { ...state, ratio: value };
      }

      if (id === 'knee') {
        compressor.setKnee(value);
        return { ...state, knee: value };
      }

      if (id === 'attack') {
        compressor.setAttack(value);
        return { ...state, attack: value };
      }

      if (id === 'release') {
        compressor.setRelease(value);
        return { ...state, release: value };
      }

      return { ...state };

    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default compressorReducer;
