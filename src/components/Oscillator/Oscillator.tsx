import { FC, useState } from 'react';
import { ControlTypes, Waves } from '../../utils/constants';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import Knob from '../utils/Knob/Knob';
import OctaveSelector from '../utils/OctaveSelector/OctaveSelector';
import './Oscillator.scss';

interface OscillatorProps {
  label: string;
}

const Oscillator: FC<OscillatorProps> = ({ label }) => {
  const [isActive, setIsActive] = useState(true);

  const waves = [Waves.SINE, Waves.TRIANGLE, Waves.SAWTOOTH, Waves.SQUARE];
  const knobs = [
    {
      label: 'level',
      initialValue: 70,
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

  return (
    <div className="oscillator A">
      <InactivePanel isActive={isActive} />
      <div className="osc-background">
        <BlocTitle
          label={label}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <WaveSelector waves={waves} />
        <div className="controls">
          <div className="knobs">
            {knobs.map(({ initialValue, label }) => (
              <Knob
                key={`${label}`}
                initialValue={initialValue}
                label={label}
                type={ControlTypes.DEFAULT}
              />
            ))}
          </div>
          <OctaveSelector size={5} />
        </div>
      </div>
    </div>
  );
};

export default Oscillator;
