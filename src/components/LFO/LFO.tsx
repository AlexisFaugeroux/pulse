import { FC, useContext, useEffect, useState } from 'react';
import { ControlTypes, Waves } from '../../utils/constants';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import './LFO.scss';
import Knob from '../utils/Knob/Knob';
import { SettingsContext } from '../../contexts/Context';
import { LFO_SettingsActionTypes } from '../../contexts/types';
import {
  initialSettings,
  oscAGain,
  oscBGain,
  oscLFOGain,
} from '../../nodesConfig';

const LFO: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const waves = [Waves.SINE, Waves.TRIANGLE, Waves.SAWTOOTH, Waves.SQUARE];
  const { lfo, gains } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: LFO_SettingsActionTypes.Activate,
        payload: {},
      });
      oscLFOGain.connect(oscAGain.gain);
      oscLFOGain.connect(oscBGain.gain);
    } else {
      dispatch({
        type: LFO_SettingsActionTypes.Deactivate,
        payload: {},
      });
      oscLFOGain.disconnect();
      oscLFOGain.disconnect();
    }
  }, [isActive, dispatch]);

  return (
    <div className="lfo">
      <InactivePanel isActive={isActive} />
      <div className="lfo-background">
        <BlocTitle label="lfo" isActive={isActive} setIsActive={setIsActive} />
        <WaveSelector parent="lfo" waves={waves} />
        <div className="controls">
          <Knob
            initialValue={lfo.frequency}
            label="rate"
            parent="lfo"
            type={ControlTypes.DEFAULT}
          />
          <Knob
            initialValue={gains.oscLFOGainValue}
            label="level"
            parent="lfo"
            type={ControlTypes.DEFAULT}
          />
        </div>
      </div>
    </div>
  );
};

export default LFO;
