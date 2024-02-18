import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { LFO_SettingsActionTypes } from '../../contexts/types';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes, Waves } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import Knob from '../utils/Knob/Knob';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import './LFO.scss';

const LFO: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const waves = [Waves.SINE, Waves.SQUARE];
  const { lfo } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: LFO_SettingsActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: LFO_SettingsActionTypes.Deactivate,
        payload: {},
      });
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
            initialValue={lfo.gain}
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
