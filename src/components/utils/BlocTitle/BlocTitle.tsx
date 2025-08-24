import { type FC, useContext } from 'react';
import switchOff from '../../../assets/main-light-switch-off.png';
import switchOn from '../../../assets/main-light-switch-on.png';
import '../BlocTitle/BlocTitle.scss';
import { SettingsContext } from '../../../contexts/Context';
import {
  Envelope_ActionTypes,
  Filter_ActionTypes,
  LFO_SettingsActionTypes,
  Oscillator_SettingsActionTypes,
} from '../../../contexts/types';
import { Noise_SettingsActionTypes } from '../../../contexts/types/noises';
import { Noise_Types } from '../../../utils/constants';

interface BlocTitle {
  label: string;
  isActive: boolean;
  parent: string;
}

export const BlocTitle: FC<BlocTitle> = ({ label, isActive, parent }) => {
  const { dispatch } = useContext(SettingsContext);

  const handleOnClick = () => {
    if (isActive) {
      if (
        parent === 'oscillatorA' ||
        parent === 'oscillatorB' ||
        parent === 'subOscillator'
      ) {
        dispatch({
          type: Oscillator_SettingsActionTypes.Deactivate,
          payload: { id: parent },
        });
      } else if (
        parent === 'whiteNoise' ||
        parent === 'pinkNoise' ||
        parent === 'brownNoise'
      ) {
        Object.values(Noise_Types).forEach((noise) =>
          dispatch({
            type: Noise_SettingsActionTypes.Deactivate,
            payload: { id: noise },
          }),
        );
      } else if (parent === 'envelope') {
        dispatch({
          type: Envelope_ActionTypes.Deactivate,
          payload: {},
        });
      } else if (parent === 'filter') {
        dispatch({
          type: Filter_ActionTypes.Deactivate,
          payload: {},
        });
      } else if (parent === 'lfo') {
        dispatch({
          type: LFO_SettingsActionTypes.Deactivate,
          payload: {},
        });
      }
    } else {
      if (
        parent === 'oscillatorA' ||
        parent === 'oscillatorB' ||
        parent === 'subOscillator'
      ) {
        dispatch({
          type: Oscillator_SettingsActionTypes.Activate,
          payload: { id: parent },
        });
      } else if (
        parent === 'whiteNoise' ||
        parent === 'pinkNoise' ||
        parent === 'brownNoise'
      ) {
        dispatch({
          type: Noise_SettingsActionTypes.Activate,
          payload: { id: parent },
        });
      } else if (parent === 'envelope') {
        dispatch({
          type: Envelope_ActionTypes.Activate,
          payload: {},
        });
      } else if (parent === 'filter') {
        dispatch({
          type: Filter_ActionTypes.Activate,
          payload: {},
        });
      } else if (parent === 'lfo') {
        dispatch({
          type: LFO_SettingsActionTypes.Activate,
          payload: {},
        });
      }
    }
  };

  return (
    <div className="blocTitle-layout">
      <button
        className="button-light"
        onClick={handleOnClick}
        style={{
          backgroundImage: `url(${isActive ? switchOn : switchOff})`,
          backgroundSize: 'cover',
          borderRadius: '5px',
          objectFit: 'cover',
          cursor: 'pointer',
          border: 'none',
          width: '18px',
          height: '18px',
          marginLeft: '5px',
          zIndex: 150,
        }}
      />
      <h2>{label.toUpperCase()}</h2>
    </div>
  );
};
