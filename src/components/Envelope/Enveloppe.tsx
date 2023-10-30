import { FC } from 'react';
import { ControlTypes } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import Knob from '../utils/Knob/Knob';
import './Enveloppe.scss';

const Enveloppe: FC = () => {
  const knobs = [
    {
      label: 'attack',
      initialValue: 5,
    },
    {
      label: 'decay',
      initialValue: 30,
    },
    {
      label: 'sustain',
      initialValue: 20,
    },
    {
      label: 'release',
      initialValue: 10,
    },
  ];

  return (
    <div className="envelope">
      <div className="envelope-background">
        <BlocTitle label="envelope" />
        <div className="knobs">
          {knobs.map(({ initialValue, label }) => (
            <Knob
              key={`${label}`}
              initialValue={initialValue}
              label={label}
              type={ControlTypes.DEFAULT}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Enveloppe;
