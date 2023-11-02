import { FC, useState } from 'react';
import { ControlTypes } from '../../../utils/constants';
import Knob from '../../utils/Knob/Knob';
import { theme } from '../../../styles/_variables';
import './Rack.scss';

interface RackProps {
  type: string;
}

const Rack: FC<RackProps> = ({ type }) => {
  let rackType: ControlTypes = ControlTypes.DEFAULT;
  let knobs: string[] = [];
  let backgroundColor = theme.darkGrey;

  const [isActive, setIsActive] = useState(false);

  switch (type) {
    case ControlTypes.DISTORTION:
      rackType = ControlTypes.DISTORTION;
      knobs = ['level', 'drive', 'mix', 'size'];
      backgroundColor = theme.distortionColor;
      break;
    case ControlTypes.FLANGER:
      rackType = ControlTypes.FLANGER;
      knobs = ['level', 'drive', 'mix', 'size'];
      backgroundColor = theme.flangerColor;
      break;
    case ControlTypes.DELAY:
      rackType = ControlTypes.DELAY;
      knobs = ['level', 'drive', 'mix', 'size'];
      backgroundColor = theme.delayColor;
      break;
    case ControlTypes.CHORUS:
      rackType = ControlTypes.CHORUS;
      knobs = ['level', 'drive', 'mix', 'size'];
      backgroundColor = theme.chorusColor;
      break;
    case ControlTypes.REVERB:
      rackType = ControlTypes.REVERB;
      knobs = ['level', 'drive', 'mix', 'size'];
      backgroundColor = theme.reverbColor;
      break;
    case ControlTypes.COMPRESSOR:
      rackType = ControlTypes.COMPRESSOR;
      knobs = ['level', 'drive', 'mix', 'size'];
      backgroundColor = theme.compressorColor;
      break;
    default:
      knobs = ['level', 'drive', 'mix', 'size'];
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
        <div className="rack-knobs">
          {knobs.map((label) => (
            <Knob initialValue={50} label={label} type={rackType} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rack;
