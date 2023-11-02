import { FC } from 'react';
import { ControlTypes, NOISE_VALUES } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WordSelector from '../utils/WordSelector/WordSelector';
import Knob from '../utils/Knob/Knob';
import './NoiseOsc.scss';

const NoiseOsc: FC = () => {
  return (
    <div className="noiseOsc">
      <div className="noiseOsc-background">
        <BlocTitle label="noise" />
        <WordSelector values={NOISE_VALUES} />
        <Knob initialValue={0} label="level" type={ControlTypes.DEFAULT} />
      </div>
    </div>
  );
};

export default NoiseOsc;
