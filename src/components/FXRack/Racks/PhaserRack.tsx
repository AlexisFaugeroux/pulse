import { type FC, useContext } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { ControlTypes, FXs } from '../../../utils/constants';
import { Knob } from '../../utils/Knob/Knob';
import { Rack } from './Rack';
import './Racks.scss';

export const PhaserRack: FC = () => {
  const {
    state: { phaser },
  } = useContext(SettingsContext);

  const { isActive, rate, depth, baseFrequency, q, wetGain } = phaser;

  return (
    <Rack type={FXs.PHASER} isActive={isActive}>
      <Knob
        initialValue={rate}
        label="rate"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={depth}
        label="depth"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={q}
        label="Q"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={baseFrequency}
        label="base.freq"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
    </Rack>
  );
};
