import React, { FC, useState } from 'react';
import { convertRange, getDeg } from './helpers';
import { theme } from '../../../styles/_variables';
import './index.scss';
import { ControlTypes, type KnobProps } from './types';

const Knob: FC<KnobProps> = ({ type, label }) => {
  const size = 30;
  const numTicks = 150;
  const degrees = 200;
  const min = 1;
  const max = 100;
  const value = 30;

  const fullAngle = degrees;
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const margin = size * 0.15;

  const [deg, setDeg] = useState<number>(
    Math.floor(convertRange(min, max, startAngle, endAngle, value)),
  );

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as Element;
    const knob = target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e: MouseEvent) => {
      let currentDeg = getDeg(startAngle, endAngle, e.clientX, e.clientY, pts);

      if (currentDeg === startAngle) currentDeg--;

      const newValue = Math.floor(
        convertRange(startAngle, endAngle, min, max, currentDeg),
      );

      setDeg(currentDeg);
      console.log(newValue);
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveHandler);
    });
  };

  const renderTicks = () => {
    const ticks = [];
    const incr = fullAngle / numTicks;
    const tickSize = margin + size / 2;
    let boxShadowActive = '';

    switch (type) {
      case ControlTypes.DEFAULT:
        boxShadowActive = `inset 5px 5px 5px 5px ${theme.mainGreen}, 0 0 0 0.5px ${theme.mainGreen}`;
        break;
      case ControlTypes.MASTER:
        boxShadowActive = `inset 5px 5px 5px 5px ${theme.lightBlue}, 0 0 0 0.5px ${theme.lightBlue}`;
        break;
      case ControlTypes.DISTORTION:
        boxShadowActive = `inset 5px 5px 5px 5px ${theme.distortionColor}, 0 0 0 0.5px ${theme.distortionColor}`;
        break;
      case ControlTypes.FLANGER:
        boxShadowActive = `inset 5px 5px 5px 5px ${theme.flangerColor}, 0 0 0 0.5px ${theme.flangerColor}`;
        break;
      case ControlTypes.DELAY:
        boxShadowActive = `inset 5px 5px 5px 5px ${theme.delayColor}, 0 0 0 0.5px ${theme.delayColor}`;
        break;
      case ControlTypes.REVERB:
        boxShadowActive = `inset 5px 5px 5px 5px ${theme.reverbColor}, 0 0 0 0.5px ${theme.reverbColor}`;
        break;
      case ControlTypes.CHORUS:
        boxShadowActive = `inset 5px 5px 5px 5px ${theme.chorusColor}, 0 0 0 0.5px ${theme.chorusColor}`;
        break;
      case ControlTypes.COMPRESSOR:
        boxShadowActive = `inset 5px 5px 5px 5px ${theme.compressorColor}, 0 0 0 0.5px ${theme.compressorColor}`;
        break;
      default:
        boxShadowActive = '';
        return;
    }

    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      const tick = {
        deg: deg,
        tickStyle: {
          height: tickSize + 7,
          left: tickSize - 3,
          top: tickSize + 2,
          transform: `rotate(${deg}deg)`,
          transformOrigin: 'top',
        },
        activeStyle: {
          boxShadow: boxShadowActive,
        },
        lastOneStyle: {
          boxShadow: `inset 5px 5px 5px 5px red`,
        },
      };
      ticks.push(tick);
    }
    return ticks;
  };

  const dcpy = (o: Record<string, number | string>) => {
    return JSON.parse(JSON.stringify(o));
  };

  const kStyle = {
    width: size,
    height: size,
  };

  const iStyle = dcpy(kStyle);
  const oStyle = dcpy(kStyle);
  oStyle.margin = margin;
  const gStyle = {
    background: '',
  };

  switch (type) {
    case ControlTypes.DEFAULT:
      oStyle.backgroundImage = `radial-gradient(100% 70%, ${theme.mainGrey} 45%, ${theme.darkGrey} 100%)`;
      gStyle.background = theme.mainGreen;
      break;
    case ControlTypes.MASTER:
      oStyle.backgroundImage = `radial-gradient(100% 70%, ${theme.mainGrey} 6%, ${theme.darkGrey} 90%)`;
      oStyle.boxShadow = `
      0 5px 10px 2px black,
      0 0 5px 3px black,
      0 0 0 6px black`;
      gStyle.background = theme.lightBlue;
      break;
    case ControlTypes.DISTORTION:
      oStyle.backgroundImage = `radial-gradient(100% 70%, ${theme.distortionColor} 45%, ${theme.darkGrey} 100%)`;
      gStyle.background = theme.distortionColor;
      break;
    case ControlTypes.FLANGER:
      oStyle.backgroundImage = `radial-gradient(100% 70%, ${theme.flangerColor} 45%, ${theme.darkGrey} 100%)`;
      gStyle.background = theme.flangerColor;
      break;
    case ControlTypes.DELAY:
      oStyle.backgroundImage = `radial-gradient(100% 70%, ${theme.delayColor} 45%, ${theme.darkGrey} 100%)`;
      gStyle.background = theme.delayColor;
      break;
    case ControlTypes.REVERB:
      oStyle.backgroundImage = `radial-gradient(100% 70%, ${theme.reverbColor} 45%, ${theme.darkGrey} 100%)`;
      gStyle.background = theme.reverbColor;
      break;
    case ControlTypes.CHORUS:
      oStyle.backgroundImage = `radial-gradient(100% 70%, ${theme.chorusColor} 45%, ${theme.darkGrey} 100%)`;
      gStyle.background = theme.chorusColor;
      break;
    case ControlTypes.COMPRESSOR:
      gStyle.background = theme.compressorColor;
      break;
    default:
      oStyle.backgroundImage = '';
      gStyle.background = '';
      return;
  }

  iStyle.transform = `rotate(${deg}deg)`;

  return (
    <div className="control">
      <div className="knob" style={kStyle}>
        <div className="ticks">
          {numTicks
            ? renderTicks()?.map((tick, i) => (
                <div
                  key={i}
                  className={`tick ${tick.deg <= deg ? 'active' : ''}`}
                  style={
                    tick.deg > deg
                      ? tick.tickStyle
                      : i >= numTicks - 1
                      ? {
                          ...tick.tickStyle,
                          boxShadow: tick.lastOneStyle.boxShadow,
                        }
                      : { ...tick.tickStyle, ...tick.activeStyle }
                  }
                />
              ))
            : null}
        </div>

        <div className="knob outer" style={oStyle} onMouseDown={startDrag}>
          <div className="knob inner" style={iStyle}>
            <div className="grip" style={gStyle} />
          </div>
        </div>
      </div>

      {type !== ControlTypes.MASTER && (
        <div className="label">{label.toLocaleUpperCase()}</div>
      )}
    </div>
  );
};

export default Knob;
