import { FC, useState } from 'react';
import { ControlTypes, NOISE_VALUES } from '../../utils/constants';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WordSelector from '../utils/WordSelector/WordSelector';
import Knob from '../utils/Knob/Knob';
import './NoiseOsc.scss';

const NoiseOsc: FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="noiseOsc">
      <InactivePanel isActive={isActive} />
      <div className="noiseOsc-background">
        <BlocTitle
          label="noise"
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <WordSelector values={NOISE_VALUES} />
        <Knob initialValue={0} label="level" type={ControlTypes.DEFAULT} />
      </div>
    </div>
  );
};

export default NoiseOsc;
