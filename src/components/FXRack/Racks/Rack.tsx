import { type FC, type PropsWithChildren, useContext } from 'react';
import { theme } from '../../../styles/_variables';
import { FXs } from '../../../utils/constants';
import './Racks.scss';
import { SettingsContext } from '../../../contexts/Context';
import {
  Chorus_ActionTypes,
  Compressor_ActionTypes,
  Delay_ActionTypes,
  Distortion_ActionTypes,
  Phaser_ActionTypes,
  Reverb_ActionTypes,
} from '../../../contexts/types';

interface RackProps extends PropsWithChildren {
  type: FXs;
  isActive: boolean;
}

export const Rack: FC<RackProps> = ({ type, isActive, children }) => {
  const { dispatch } = useContext(SettingsContext);

  let rackType: FXs = FXs.DISTORTION;
  let backgroundColor = theme.darkGrey;

  switch (type) {
    case FXs.DISTORTION:
      rackType = FXs.DISTORTION;
      backgroundColor = theme.distortionColor;
      break;
    case FXs.PHASER:
      rackType = FXs.PHASER;
      backgroundColor = theme.phaserColor;
      break;
    case FXs.DELAY:
      rackType = FXs.DELAY;
      backgroundColor = theme.delayColor;
      break;
    case FXs.CHORUS:
      rackType = FXs.CHORUS;
      backgroundColor = theme.chorusColor;
      break;
    case FXs.REVERB:
      rackType = FXs.REVERB;
      backgroundColor = theme.reverbColor;
      break;
    case FXs.COMPRESSOR:
      rackType = FXs.COMPRESSOR;
      backgroundColor = theme.compressorColor;
      break;
    default:
  }

  const handleOnClick = () => {
    if (rackType === FXs.DISTORTION) {
      if (isActive) {
        dispatch({
          type: Distortion_ActionTypes.DeactivateClipping,
          payload: {},
        });
        dispatch({
          type: Distortion_ActionTypes.DeactivateBitcrusher,
          payload: {},
        });
      } else {
        dispatch({
          type: Distortion_ActionTypes.ActivateClipping,
          payload: {},
        });
      }
    } else if (rackType === FXs.PHASER) {
      if (isActive) {
        dispatch({
          type: Phaser_ActionTypes.Deactivate,
          payload: {},
        });
      } else {
        dispatch({
          type: Phaser_ActionTypes.Activate,
          payload: {},
        });
      }
    } else if (rackType === FXs.CHORUS) {
      if (isActive) {
        dispatch({
          type: Chorus_ActionTypes.Deactivate,
          payload: {},
        });
      } else {
        dispatch({
          type: Chorus_ActionTypes.Activate,
          payload: {},
        });
      }
    } else if (rackType === FXs.DELAY) {
      if (isActive) {
        dispatch({
          type: Delay_ActionTypes.Deactivate,
          payload: {},
        });
      } else {
        dispatch({
          type: Delay_ActionTypes.Activate,
          payload: {},
        });
      }
    } else if (rackType === FXs.REVERB) {
      if (isActive) {
        dispatch({
          type: Reverb_ActionTypes.Deactivate,
          payload: {},
        });
      } else {
        dispatch({
          type: Reverb_ActionTypes.Activate,
          payload: {},
        });
      }
    } else if (rackType === FXs.COMPRESSOR) {
      if (isActive) {
        dispatch({
          type: Compressor_ActionTypes.Deactivate,
          payload: {},
        });
      } else {
        dispatch({
          type: Compressor_ActionTypes.Activate,
          payload: {},
        });
      }
    }
  };

  return (
    <div className={`rack ${rackType}`}>
      <div className={`rack-container`}>
        <span
          className={`line ${
            isActive ? `line-top__active line-top__${rackType}__active` : ''
          }`}
        />
        <span
          className={`line ${
            isActive ? `line-right__active line-right__${rackType}__active` : ''
          }`}
        />
        <span
          className={`line ${
            isActive
              ? `line-bottom__active line-bottom__${rackType}__active`
              : ''
          }`}
        />
        <span
          className={`line ${
            isActive ? `line-left__active line-left__${rackType}__active` : ''
          }`}
        />
        <button
          className={`rack-button rack-button__${rackType} ${
            isActive
              ? `rack-button__active rack-button__${rackType}__active`
              : ''
          }`}
          onClick={handleOnClick}
          style={{
            backgroundColor,
          }}
        >
          {type}
        </button>
        <div className="rack-knobs">{children}</div>
      </div>
    </div>
  );
};
