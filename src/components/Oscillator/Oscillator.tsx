import { FC } from 'react';
import './Oscillator.scss';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import Knob from '../utils/Knob/Knob';
import OctaveSelector from '../utils/OctaveSelector/OctaveSelector';

const Oscillator: FC = () => {
  return (
    <div className="oscillator A">
      <div className="osc-background">
        <BlocTitle label="oscillator a" />
        <WaveSelector />
        <div className="controls">
          <div className="knobs">
            <Knob label="level" type="default" />
            <Knob label="unisson" type="default" />
            <Knob label="detune" type="default" />
          </div>
          <OctaveSelector size={5} />
        </div>
      </div>
    </div>
  );
};

export default Oscillator;
