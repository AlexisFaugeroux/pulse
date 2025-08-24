import { getAudioNode } from '../../../audio/audioGraph';
import { CompressorSettings } from '../../../types/types';
import {
  Compressor_ActionTypes,
  Compressor_SettingsActions,
} from '../../types/compressor';
import { updateSettings } from './updateSettings';

const compressorReducer = (
  state: CompressorSettings,
  action: Compressor_SettingsActions,
): CompressorSettings => {
  const compressor = getAudioNode('compressor');

  if (!compressor) {
    console.error("compressor node is not initialized");
    return state;
  }

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
      return updateSettings(state, action);
    default:
      console.error('Reducer error action', action);
      return state;
  }
};

export default compressorReducer;
