import { FC } from 'react';
import { ControlTypes } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import Knob from '../utils/Knob/Knob';
import OctaveSelector from '../utils/OctaveSelector/OctaveSelector';
import './Oscillator.scss';

const Oscillator: FC = () => {
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
      <div className="osc-background">
        <BlocTitle label="oscillator a" />
        <WaveSelector />
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
