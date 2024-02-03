import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { Oscillator_SettingsActionTypes } from '../../contexts/types/index';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes, Waves } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import Knob from '../utils/Knob/Knob';
import OctaveSelector from '../utils/OctaveSelector/OctaveSelector';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import './Oscillator.scss';

interface OscillatorProps {
  id: 'oscillatorA' | 'oscillatorB';
  label: string;
}

const Oscillator: FC<OscillatorProps> = ({ id, label }) => {
  const { dispatch } = useContext(SettingsContext);
  const {
    oscillators: { oscillatorA, oscillatorB },
  } = initialSettings;

  const [isActive, setIsActive] = useState(
    id === 'oscillatorA' ? oscillatorA.isActive : oscillatorB.isActive,
  );

  const waves = [Waves.SINE, Waves.TRIANGLE, Waves.SAWTOOTH, Waves.SQUARE];

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
    <div className="oscillator">
      <InactivePanel isActive={isActive} />
      <div className="osc-background">
        <BlocTitle
          label={label}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <WaveSelector parent={id} waves={waves} />
        <div className="controls">
          <div className="knobs">
            <Knob
              parent={id}
              initialValue={
                id === 'oscillatorA' ? oscillatorA.gain : oscillatorB.gain
              }
              label="level"
              type={ControlTypes.DEFAULT}
            />
            <Knob
              parent={id}
              initialValue={0}
              label="unisson"
              type={ControlTypes.DEFAULT}
            />
            <Knob
              parent={id}
              initialValue={
                id === 'oscillatorA' ? oscillatorA.detune : oscillatorB.detune
              }
              label="detune"
              type={ControlTypes.DEFAULT}
            />
          </div>
          <OctaveSelector size={5} parent={id} />
        </div>
      </div>
    </div>
  );
};

export default Oscillator;
