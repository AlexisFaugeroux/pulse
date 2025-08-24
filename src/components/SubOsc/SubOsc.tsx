import { type FC, useContext } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { ControlTypes, Waves } from '../../utils/constants';
import { BlocTitle } from '../utils/BlocTitle/BlocTitle';
import { InactivePanel } from '../utils/InactivePanel/InactivePanel';
import { Knob } from '../utils/Knob/Knob';
import { OctaveSelector } from '../utils/OctaveSelector/OctaveSelector';
import { WaveSelector } from '../utils/WaveSelector/WaveSelector';
import './SubOsc.scss';

interface SubOscillatorProps {
  id: string;
  label: string;
}

export const SubOsc: FC<SubOscillatorProps> = ({ id, label }) => {
  const {
    state: {
      oscillators: { subOscillator },
    },
  } = useContext(SettingsContext);

  const waves = [Waves.SINE, Waves.SAWTOOTH];

  return (
    <div className="subOsc">
      <InactivePanel isActive={subOscillator.isActive} />
      <div className="subOsc-background">
        <BlocTitle
          label={label}
          isActive={subOscillator.isActive}
          parent={id}
        />
        <WaveSelector parent={id} waves={waves} activeWave={subOscillator.type} />
        <div className="controls">
          <Knob
            parent={id}
            initialValue={subOscillator.gain}
            label="level"
            type={ControlTypes.DEFAULT}
          />
          <OctaveSelector
            initialOctaveOffset={subOscillator.octaveOffset}
            parent={id}
            size={3}
          />
        </div>
      </div>
    </div>
  );
};
