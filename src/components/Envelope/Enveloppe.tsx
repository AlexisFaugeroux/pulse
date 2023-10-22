import { FC } from 'react';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import './Enveloppe.scss';
import Knob from '../utils/Knob/Knob';

const Enveloppe: FC = () => {
  return (
    <div className="envelope">
      <div className="envelope-background">
        <BlocTitle label="envelope" />
        <div className="knobs">
          <Knob label="attack" type="default" />
          <Knob label="decay" type="default" />
          <Knob label="sustain" type="default" />
          <Knob label="release" type="default" />
        </div>
      </div>
    </div>
  );
};

export default Enveloppe;
