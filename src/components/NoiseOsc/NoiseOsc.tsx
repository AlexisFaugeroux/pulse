import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { Noise_SettingsActionTypes } from '../../contexts/types/noises';
// import { initialSettings } from '../../nodesConfig';
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
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);
  const [currentType, setCurrentType] = useState(Noise_Types.WHITE.toString());

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Noise_SettingsActionTypes.Activate,
        payload: { id: Noise_Types[currentType as keyof typeof Noise_Types] },
      });
    } else {
      Object.values(Noise_Types).forEach((noise) =>
        dispatch({
          type: Noise_SettingsActionTypes.Deactivate,
          payload: { id: noise },
        }),
      );
    }
  }, [isActive, dispatch, currentType]);

  return (
    <div className="noiseOsc">
      <InactivePanel isActive={isActive} />
      <div className="noiseOsc-background">
        <BlocTitle
          label={label}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <WordSelector
          parent={id}
          values={Object.keys(Noise_Types)}
          currentType={currentType}
          setCurrentType={setCurrentType}
        />
        <Knob
          initialValue={0.3}
          label="level"
          parent={id}
          type={ControlTypes.DEFAULT}
        />
      </div>
    </div>
  );
};

export default NoiseOsc;
