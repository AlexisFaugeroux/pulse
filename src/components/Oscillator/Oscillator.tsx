import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';
import { Oscillator_SettingsActionTypes } from '../../context/types/index';
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
  const { state, dispatch } = useContext(Context);
  const { oscillatorA, oscillatorB } = state.oscillators;
  const { oscAGainValue, oscBGainValue } = initialSettings.gains;

  const [isActive, setIsActive] = useState(
    id === 'oscillatorA' ? oscillatorA.isActive : oscillatorB.isActive,
  );

  const waves = [Waves.SINE, Waves.TRIANGLE, Waves.SAWTOOTH, Waves.SQUARE];
  const knobs = [
    {
      label: 'level',
      initialValue: id === 'oscillatorA' ? oscAGainValue : oscBGainValue,
    },
    {
      label: 'unisson',
      initialValue: 0,
    },
    {
      label: 'detune',
      initialValue: 0,
    },
  ];

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
            {knobs.map(({ initialValue, label }) => (
              <Knob
                key={id + label}
                parent={id}
                initialValue={initialValue}
                label={label}
                type={ControlTypes.DEFAULT}
              />
            ))}
          </div>
          <OctaveSelector size={5} parent={id} />
        </div>
      </div>
    </div>
  );
};

export default Oscillator;
