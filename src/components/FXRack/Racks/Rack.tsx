import { FC, PropsWithChildren } from 'react';
import { theme } from '../../../styles/_variables';
import { FXs } from '../../../utils/constants';
import './Racks.scss';

interface RackProps extends PropsWithChildren {
  type: FXs;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Rack: FC<RackProps> = ({ type, isActive, setIsActive, children }) => {
  let rackType: FXs = FXs.DISTORTION;
  let backgroundColor = theme.darkGrey;

  switch (type) {
    case FXs.DISTORTION:
      rackType = FXs.DISTORTION;
      backgroundColor = theme.distortionColor;
      break;
    case FXs.FLANGER:
      rackType = FXs.FLANGER;
      backgroundColor = theme.flangerColor;
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
          onClick={() => setIsActive(!isActive)}
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

export default Rack;
