import { type FC, useContext } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { ControlTypes, FXs } from '../../../utils/constants';
import { Knob } from '../../utils/Knob/Knob';
import { Rack } from './Rack';
import './Racks.scss';

export const ChorusRack: FC = () => {
  const {
    state: { chorus },
  } = useContext(SettingsContext);

  const { isActive, rate, time, depth, feedback, stereoPhase, wetGain } =
    chorus;

  return (
    <Rack type={FXs.CHORUS} isActive={isActive}>
      <Knob
        initialValue={rate}
        label="rate"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={time}
        label="time"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={depth}
        label="depth"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={feedback}
        label="feedback"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={stereoPhase}
        label="phase"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
    </Rack>
  );
};
