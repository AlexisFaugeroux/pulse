import {
  audioContext,
  oscAGain,
  oscBGain,
  oscLFOGain,
} from '../../nodesConfig';
import LFO from '../../utils/classes/LFO';
import { TIME_CONSTANT } from '../../utils/constants';
import {
  linearToLogarithmRange,
  roundTwoDigitsNonFinite,
} from '../../utils/helpers';
import { LFO_SettingsActionTypes, type LFO_SettingsActions } from '../types';

let currentLFO: LFO | null;

const LFOReducer = (
  state: {
    isActive: boolean;
    type: OscillatorType;
    frequency: number;
    gain: number;
  },
  action: LFO_SettingsActions,
): typeof state => {
  const { id, value } = action.payload;

  switch (action.type) {
    case LFO_SettingsActionTypes.Activate:
      currentLFO = new LFO(
        audioContext,
        oscLFOGain,
        state.type,
        state.frequency,
      );

      oscLFOGain.connect(oscAGain.gain);
      oscLFOGain.connect(oscBGain.gain);

      return { ...state, isActive: true };

    case LFO_SettingsActionTypes.Deactivate:
      if (currentLFO) {
        currentLFO.node.disconnect();
        currentLFO.node.stop();
        currentLFO = null;
      }

      oscLFOGain.disconnect();
      oscLFOGain.disconnect();

      return { ...state, isActive: false };

    case LFO_SettingsActionTypes.UpdateSettings:
      if (!value) return { ...state };

      if (id === 'rate') {
        const convertedValue = linearToLogarithmRange({
          base: 10,
          value: value,
          linearRange: [0, 1],
          logarithmicRange: [0.1, 20],
        });

        if (currentLFO) {
          const newRate = currentLFO?.node.frequency.setTargetAtTime(
            convertedValue,
            audioContext.currentTime,
            TIME_CONSTANT,
          );

          return { ...state, frequency: newRate.value };
        }
      }
      if (id === 'level') {
        oscLFOGain.gain.setTargetAtTime(
          roundTwoDigitsNonFinite(value),
          audioContext.currentTime,
          TIME_CONSTANT,
        );
        return { ...state, gain: value };
      }
      return { ...state };

    case LFO_SettingsActionTypes.UpdateType:
      if (!id) {
        console.error('Update LFO type: no id provided');
        return { ...state };
      }

      if (currentLFO) {
        currentLFO.node.type = id as OscillatorType;
        return { ...state, type: id as OscillatorType };
      }

      return { ...state };

    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};
export default LFOReducer;
