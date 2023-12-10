import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';
import { Envelope_ActionTypes } from '../../context/types';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import Knob from '../utils/Knob/Knob';
import './Envelope.scss';

const Envelope: FC = () => {
  const { dispatch } = useContext(Context);

  const { envelope } = initialSettings;
  const [isActive, setIsActive] = useState(envelope.isActive);

  const knobs = [
    {
      label: 'attack',
      initialValue: envelope.attack,
    },
    {
      label: 'decay',
      initialValue: envelope.decay,
    },
    {
      label: 'sustain',
      initialValue: envelope.sustain,
    },
    {
      label: 'release',
      initialValue: envelope.release,
    },
  ];

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Envelope_ActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: Envelope_ActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  return (
    <div className="envelope">
      <InactivePanel isActive={isActive} />
      <div className="envelope-background">
        <BlocTitle
          label="envelope"
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <div className="knobs">
          {knobs.map(({ initialValue, label }) => (
            <Knob
              key={`${label}`}
              initialValue={initialValue}
              label={label}
              type={ControlTypes.DEFAULT}
              parent="envelope"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Envelope;
