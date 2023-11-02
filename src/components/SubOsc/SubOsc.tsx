import { FC } from 'react';
import { ControlTypes, Waves } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import Knob from '../utils/Knob/Knob';
import OctaveSelector from '../utils/OctaveSelector/OctaveSelector';
import './SubOsc.scss';

const SubOsc: FC = () => {
  const waves = [Waves.SINE, Waves.SAWTOOTH];

  return (
    <div className="subOsc">
      <div className="subOsc-background">
        <BlocTitle label="sub" />
        <WaveSelector waves={waves} />
        <div className="controls">
          <Knob initialValue={30} label="level" type={ControlTypes.DEFAULT} />
          <OctaveSelector size={3} />
        </div>
      </div>
    </div>
  );
};

export default SubOsc;
