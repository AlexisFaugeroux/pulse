import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { Envelope_ActionTypes } from '../../contexts/types';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import Knob from '../utils/Knob/Knob';
import './Envelope.scss';

const Envelope: FC = () => {
  const { dispatch } = useContext(SettingsContext);

  const { envelope } = initialSettings;
  const [isActive, setIsActive] = useState(envelope.isActive);

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

export default Envelope;
