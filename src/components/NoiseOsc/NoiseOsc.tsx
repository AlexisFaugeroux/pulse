import { type FC, useContext, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { ControlTypes, Noise_Types } from '../../utils/constants';
import { BlocTitle } from '../utils/BlocTitle/BlocTitle';
import { InactivePanel } from '../utils/InactivePanel/InactivePanel';
import { Knob } from '../utils/Knob/Knob';
import { WordSelector } from '../utils/WordSelector/WordSelector';
import './NoiseOsc.scss';

interface NoiseOscProps {
  id: string;
  label: string;
}

export const NoiseOsc: FC<NoiseOscProps> = ({ id, label }) => {
  const {
    state: { noises },
  } = useContext(SettingsContext);
  const [currentType, setCurrentType] = useState(Noise_Types.WHITE.toString());

  const currentNoise = Object.values(noises).find((noise) => {
    return noise.id === Noise_Types[currentType as keyof typeof Noise_Types];
  });

  return (
    <div className="noiseOsc">
      <InactivePanel
        isActive={Object.values(noises).some((noise) => noise.isActive)}
      />
      <div className="noiseOsc-background">
        <BlocTitle
          label={label}
          isActive={currentNoise?.isActive ?? false}
          parent={currentNoise?.id ?? 'whiteNoise'}
        />
        <WordSelector
          parent={id}
          values={Object.keys(Noise_Types)}
          currentType={currentType}
          setCurrentType={setCurrentType}
        />
        <Knob
          initialValue={0.3}
          label="level"
          parent={id}
          type={ControlTypes.DEFAULT}
        />
      </div>
    </div>
  );
};
