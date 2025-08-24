import { type FC, useContext } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { ControlTypes } from '../../utils/constants';
import { BlocTitle } from '../utils/BlocTitle/BlocTitle';
import { InactivePanel } from '../utils/InactivePanel/InactivePanel';
import { Knob } from '../utils/Knob/Knob';
import './Envelope.scss';

export const Envelope: FC = () => {
  const {
    state: { envelope },
  } = useContext(SettingsContext);

  return (
    <div className="envelope">
      <InactivePanel isActive={envelope.isActive} />
      <div className="envelope-background">
        <BlocTitle
          label="envelope"
          isActive={envelope.isActive}
          parent="envelope"
        />
        <div className="knobs">
          <Knob
            initialValue={envelope.attack}
            label="attack"
            type={ControlTypes.DEFAULT}
            parent="envelope"
          />
          <Knob
            initialValue={envelope.decay}
            label="decay"
            type={ControlTypes.DEFAULT}
            parent="envelope"
          />
          <Knob
            initialValue={envelope.sustain}
            label="sustain"
            type={ControlTypes.DEFAULT}
            parent="envelope"
          />
          <Knob
            initialValue={envelope.release}
            label="release"
            type={ControlTypes.DEFAULT}
            parent="envelope"
          />
        </div>
      </div>
    </div>
  );
};
