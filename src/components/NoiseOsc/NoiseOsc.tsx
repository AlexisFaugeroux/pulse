import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { Noise_SettingsActionTypes } from '../../contexts/types/noises';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes, Noise_Types } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import Knob from '../utils/Knob/Knob';
import WordSelector from '../utils/WordSelector/WordSelector';
import './NoiseOsc.scss';

interface NoiseOscProps {
  id: string;
  label: string;
}

const NoiseOsc: FC<NoiseOscProps> = ({ id, label }) => {
  const {
    dispatch,
    state: { noises },
  } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const {
    noises: { whiteNoise },
  } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Noise_SettingsActionTypes.Activate,
        payload: { id: noises.whiteNoise.id },
      });
    } else {
      dispatch({
        type: Noise_SettingsActionTypes.Deactivate,
        payload: { id: noises.whiteNoise.id },
      });
    }
  }, [isActive, dispatch, id, noises.whiteNoise.id]);

  return (
    <div className="noiseOsc">
      <InactivePanel isActive={isActive} />
      <div className="noiseOsc-background">
        <BlocTitle
          label={label}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <WordSelector parent="noiseOsc" values={Object.keys(Noise_Types)} />
        <Knob
          initialValue={whiteNoise.gain}
          label="level"
          parent="noiseOsc"
          type={ControlTypes.DEFAULT}
        />
      </div>
    </div>
  );
};

export default NoiseOsc;
