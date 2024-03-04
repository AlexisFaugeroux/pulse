import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { initialSettings } from '../../../nodesConfig';
import { ControlTypes, FXs } from '../../../utils/constants';
import Knob from '../../utils/Knob/Knob';
import Rack from './Rack';
import './Racks.scss';
import { Compressor_ActionTypes } from '../../../contexts/types/compressor';

const CompressorRack: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const {
    compressor: { attack, release, knee, ratio, threshold, wetGain },
  } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Compressor_ActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: Compressor_ActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  return (
    <Rack type={FXs.COMPRESSOR} isActive={isActive} setIsActive={setIsActive}>
      <Knob
        initialValue={threshold}
        label="thresh."
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={ratio}
        label="ratio"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={knee}
        label="knee"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={attack}
        label="attack"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={release}
        label="release"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
    </Rack>
  );
};

export default CompressorRack;
