import { FC, useContext, useEffect, useRef, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import {
  Delay_ActionTypes,
  Envelope_ActionTypes,
  Filter_ActionTypes,
  LFO_SettingsActionTypes,
  Oscillator_SettingsActionTypes,
} from '../../../contexts/types/index';
import { theme } from '../../../styles/_variables';
import { ControlTypes, FXs } from '../../../utils/constants';
import './Knob.scss';
import SvgDefs from './SvgDefs';
import { clampValue } from './helpers';

interface KnobProps {
  parent: string;
  initialValue: number;
  label: string;
  type: ControlTypes;
}

const Knob: FC<KnobProps> = ({ parent, initialValue, label, type }) => {
  const min = 0;
  const max = 1;
  const dragResistance = 300 / (max - min);
  let dragStartPosition = 0;

  const { dispatch } = useContext(SettingsContext);
  const [value, setValue] = useState(initialValue);
  const [isActiveDrag, setIsActiveDrag] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const indicatorRingBgRef = useRef<SVGCircleElement>(null);
  const indicatorRingRef = useRef<SVGPathElement>(null);
  const indicatorDotRef = useRef<SVGCircleElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (e.buttons & 1) {
      const dragAmount = e.clientY - dragStartPosition;
      setValue(clampValue(value - dragAmount / dragResistance, min, max));
    } else {
      clearDrag();
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    const dragAmount = e.clientY - dragStartPosition;
    setValue(clampValue(value - dragAmount / dragResistance, min, max));

    clearDrag();
  };

  const clearDrag = () => {
    document.body.classList.remove('knob-input__drag-active');
    setIsActiveDrag(false);

    document.body.removeEventListener('mousemove', handleMouseMove);
    document.body.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    let r = 0;

    if (indicatorRingBgRef.current) {
      const ringStyle = getComputedStyle(indicatorRingBgRef.current);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      r = parseFloat(ringStyle.r) - parseFloat(ringStyle.strokeWidth) / 2;
    }

    if (indicatorDotRef.current) {
      indicatorDotRef.current.style.transformOrigin = '20px 20px';
    }

    const theta = Math.PI * 2 * value + 0.5 * Math.PI;
    const endX = r * Math.cos(theta) + 20;
    const endY = r * Math.sin(theta) + 20;

    if (indicatorRingRef.current && indicatorDotRef.current) {
      indicatorRingRef.current.setAttribute(
        'd',
        `M20,20l0,${r}${
          value > 0.5 ? `A${r},${r},0,0,1,20,${20 - r}` : ''
        }A-${r},${r},0,0,1,${endX},${endY}Z`,
      );
      indicatorDotRef.current.style.transform = `rotate(${360 * value}deg)`;
    }
  }, [indicatorRingRef, indicatorRingBgRef, indicatorDotRef, value]);

  useEffect(() => {
    if (parent === 'oscillatorA' || parent === 'oscillatorB') {
      dispatch({
        type: Oscillator_SettingsActionTypes.UpdateSettings,
        payload: { id: label, parent, value },
      });
    } else if (parent === 'envelope') {
      dispatch({
        type: Envelope_ActionTypes.UpdateSettings,
        payload: { id: label, value },
      });
    } else if (parent === 'lfo') {
      dispatch({
        type: LFO_SettingsActionTypes.UpdateSettings,
        payload: { id: label, value },
      });
    } else if (parent === 'filter') {
      dispatch({
        type: Filter_ActionTypes.UpdateSettings,
        payload: { id: label, value },
      });
    } else if (parent === FXs.DELAY) {
      dispatch({
        type: Delay_ActionTypes.UpdateSettings,
        payload: { id: label, value },
      });
    }
  }, [label, parent, value, dispatch]);

  let indicatorRingFillColor = '';
  let indicatorDotFillColor = '';
  let indcatorDotStrokeColor = '';

  switch (type) {
    case ControlTypes.MASTER:
      indicatorRingFillColor = theme.lightBlue;
      indicatorDotFillColor = theme.lightBlue;
      break;
    case ControlTypes.DEFAULT:
      indicatorRingFillColor = theme.mainGreen;
      indicatorDotFillColor = theme.mainGreen;
      break;
    case ControlTypes.DISTORTION:
      indicatorRingFillColor = theme.distortionColor;
      indicatorDotFillColor = theme.distortionColor;
      indcatorDotStrokeColor = 'black';
      break;
    case ControlTypes.FLANGER:
      indicatorRingFillColor = theme.flangerColor;
      indicatorDotFillColor = theme.flangerColor;
      indcatorDotStrokeColor = 'black';
      break;
    case ControlTypes.DELAY:
      indicatorRingFillColor = theme.delayColor;
      indicatorDotFillColor = theme.delayColor;
      indcatorDotStrokeColor = 'black';
      break;
    case ControlTypes.REVERB:
      indicatorRingFillColor = theme.reverbColor;
      indicatorDotFillColor = theme.reverbColor;
      indcatorDotStrokeColor = 'black';
      break;
    case ControlTypes.CHORUS:
      indicatorRingFillColor = theme.chorusColor;
      indicatorDotFillColor = theme.chorusColor;
      indcatorDotStrokeColor = 'black';
      break;
    case ControlTypes.COMPRESSOR:
      indicatorRingFillColor = theme.compressorColor;
      indicatorDotFillColor = theme.compressorColor;
      indcatorDotStrokeColor = 'black';
      break;
  }

  return (
    <div className="knob">
      <SvgDefs />
      <div className="knob__control">
        <div
          className={`knob-input
          ${isActiveDrag ? 'drag-active' : ''}
          ${isFocus ? 'focus-active' : ''}
          `}
        >
          <svg className="knob-input__visual" viewBox="0 0 40 40">
            <circle
              className="focus-indicator"
              cx={20}
              cy={20}
              r={18}
              fill="#4eccff"
              filter="url(#glow)"
            ></circle>
            <circle
              className="indicator-ring-bg"
              cx={20}
              cy={20}
              r={18}
              fill="#353b3f"
              stroke="#23292d"
              ref={indicatorRingBgRef}
            ></circle>
            <path
              className="indicator-ring"
              d="M20,20Z"
              fill={indicatorRingFillColor}
              ref={indicatorRingRef}
            ></path>
            <g className="dial">
              <circle
                cx={20}
                cy={20}
                r={16}
                fill="url(#grad-dial-soft-shadow)"
              ></circle>
              <ellipse
                cx={20}
                cy={22}
                rx={14}
                ry={14.5}
                fill="#242a2e"
                opacity={0.15}
              ></ellipse>
              <circle
                cx={20}
                cy={20}
                r={14}
                fill={`url(#grad-dial-base-${type})`}
                stroke="#242a2e"
                strokeWidth={3}
              ></circle>
              <circle
                cx={20}
                cy={20}
                r={13}
                fill="transparent"
                stroke="url(#grad-dial-highlight)"
                strokeWidth={1.5}
              ></circle>
              <circle
                className="dial-highlight"
                cx={20}
                cy={20}
                r="14"
                fill="#ffffff"
              ></circle>
              <circle
                className="indicator-dot"
                cx={20}
                cy={30}
                r={1.5}
                fill={indicatorDotFillColor}
                stroke={indcatorDotStrokeColor}
                ref={indicatorDotRef}
              ></circle>
            </g>
          </svg>
          <input
            type="range"
            className="knob-input__input"
            min={min}
            max={max}
            step="any"
            value={value}
            onChange={(e) => {
              setValue(parseFloat(e.target.value));
            }}
            onMouseDown={(e) => {
              clearDrag();
              e.preventDefault();

              document.body.classList.add('knob-input__drag-active');
              setIsActiveDrag(true);

              dragStartPosition = e.clientY;
              setValue(parseFloat(e.currentTarget.value));

              document.body.addEventListener('mousemove', handleMouseMove);
              document.body.addEventListener('mouseup', handleMouseUp);
            }}
            onDoubleClick={() => {
              clearDrag();

              setValue(initialValue);
            }}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
          />
        </div>
        {type !== ControlTypes.MASTER && (
          <div className="knob__label">{label}</div>
        )}
      </div>
    </div>
  );
};

export default Knob;
