import { FC, useState } from 'react';
import { ControlTypes, Waves } from '../../utils/constants';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import './LFO.scss';
import Knob from '../utils/Knob/Knob';

const LFO: FC = () => {
  const [isActive, setIsActive] = useState(false);

  const waves = [Waves.SINE, Waves.TRIANGLE, Waves.SAWTOOTH, Waves.SQUARE];
  const knobs = ['rate', 'mix'];

  return (
    <div className="lfo">
      <InactivePanel isActive={isActive} />
      <div className="lfo-background">
        <BlocTitle label="lfo" isActive={isActive} setIsActive={setIsActive} />
        <WaveSelector waves={waves} />
        <div className="controls">
          {knobs.map((label) => (
            <Knob initialValue={50} label={label} type={ControlTypes.DEFAULT} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LFO;
