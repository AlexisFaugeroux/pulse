import { type FC, useContext } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { ControlTypes, Waves } from '../../utils/constants';
import { BlocTitle } from '../utils/BlocTitle/BlocTitle';
import { InactivePanel } from '../utils/InactivePanel/InactivePanel';
import { Knob } from '../utils/Knob/Knob';
import { OctaveSelector } from '../utils/OctaveSelector/OctaveSelector';
import { WaveSelector } from '../utils/WaveSelector/WaveSelector';
import './Oscillator.scss';

interface OscillatorProps {
  id: 'oscillatorA' | 'oscillatorB';
  label: string;
}

export const Oscillator: FC<OscillatorProps> = ({ id, label }) => {
  const {
    state: {
      oscillators: { oscillatorA, oscillatorB },
    },
  } = useContext(SettingsContext);

  const oscillator = id === 'oscillatorA' ? oscillatorA : oscillatorB;

  const waves = [Waves.SINE, Waves.TRIANGLE, Waves.SAWTOOTH, Waves.SQUARE];

  return (
    <div className="oscillator">
      <InactivePanel isActive={oscillator.isActive} />
      <div className="osc-background">
        <BlocTitle
          label={label}
          isActive={oscillator.isActive}
          parent={id}
        />
        <WaveSelector parent={id} waves={waves} activeWave={oscillator.type}/>
        <div className="controls">
          <div className="knobs">
            <Knob
              parent={id}
              initialValue={oscillator.gain}
              label="level"
              type={ControlTypes.DEFAULT}
            />
            <Knob
              parent={id}
              initialValue={0}
              label="unisson"
              type={ControlTypes.DEFAULT}
            />
            <Knob
              parent={id}
              initialValue={oscillator.detune}
              label="detune"
              type={ControlTypes.DEFAULT}
            />
          </div>
          <OctaveSelector
            initialOctaveOffset={oscillator.octaveOffset}
            size={5}
            parent={id}
          />
        </div>
      </div>
    </div>
  );
};
