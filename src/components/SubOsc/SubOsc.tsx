import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { Oscillator_SettingsActionTypes } from '../../contexts/types';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes, Waves } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import Knob from '../utils/Knob/Knob';
import OctaveSelector from '../utils/OctaveSelector/OctaveSelector';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import './SubOsc.scss';

interface SubOscillatorProps {
  id: string;
  label: string;
}

const SubOsc: FC<SubOscillatorProps> = ({ id, label }) => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const {
    oscillators: { subOscillator },
  } = initialSettings;

  const waves = [Waves.SINE, Waves.SAWTOOTH];

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Oscillator_SettingsActionTypes.Activate,
        payload: { id },
      });
    } else {
      dispatch({
        type: Oscillator_SettingsActionTypes.Deactivate,
        payload: { id },
      });
    }
  }, [isActive, dispatch, id]);

  return (
    <div className="subOsc">
      <InactivePanel isActive={isActive} />
      <div className="subOsc-background">
        <BlocTitle
          label={label}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <WaveSelector parent={id} waves={waves} />
        <div className="controls">
          <Knob
            parent={id}
            initialValue={subOscillator.gain}
            label="level"
            type={ControlTypes.DEFAULT}
          />
          <OctaveSelector parent={id} size={3} />
        </div>
      </div>
    </div>
  );
};

export default SubOsc;
