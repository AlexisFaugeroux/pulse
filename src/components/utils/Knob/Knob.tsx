import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { Distortion_ActionTypes } from '../../../contexts/types/distortion';
import {
  Chorus_ActionTypes,
  Compressor_ActionTypes,
  Delay_ActionTypes,
  Envelope_ActionTypes,
  Filter_ActionTypes,
  LFO_SettingsActionTypes,
  Oscillator_SettingsActionTypes,
  Phaser_ActionTypes,
  Reverb_ActionTypes,
} from '../../../contexts/types/index';
import { Master_ActionTypes } from '../../../contexts/types/master';
import { Noise_SettingsActionTypes } from '../../../contexts/types/noises';
import { theme } from '../../../styles/_variables';
import { ControlTypes, FXs } from '../../../utils/constants';
import './Knob.scss';
import { SvgDefs } from './SvgDefs';
import { clampValue } from './helpers';

interface KnobProps {
  parent: string;
  initialValue: number;
  label: string;
  type: ControlTypes;
}

export const Knob: FC<KnobProps> = ({ parent, initialValue, label, type }) => {
  const min = 0;
  const max = 1;

  const { state, dispatch } = useContext(SettingsContext);
  const [value, setValue] = useState(initialValue);
  const [isActiveDrag, setIsActiveDrag] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const indicatorRingBgRef = useRef<SVGCircleElement>(null);
  const indicatorRingRef = useRef<SVGPathElement>(null);
  const indicatorDotRef = useRef<SVGCircleElement>(null);

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
        `M20,20l0,${r}${value > 0.5 ? `A${r},${r},0,0,1,20,${20 - r}` : ''
        }A-${r},${r},0,0,1,${endX},${endY}`,
      );
      indicatorDotRef.current.style.transform = `rotate(${360 * value}deg)`;
    }
  }, [indicatorRingRef, indicatorRingBgRef, indicatorDotRef, value]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const activeDistortion = useMemo(
    () => ({
      clippingIsActive: state.distortion.clipping.isActive,
      bitCrusherIsActive: state.distortion.bitcrusher.isActive,
    }),
    [state.distortion.clipping.isActive, state.distortion.bitcrusher.isActive],
  );

  const applyValue = (newValue: number) => {
    const payload = { id: label, value: newValue };
    setValue(newValue);

    switch (parent) {
      case 'master':
        dispatch({
          type: Master_ActionTypes.UpdateValue,
          payload: { value: newValue },
        });
        break;

      case 'oscillatorA':
      case 'oscillatorB':
      case 'subOscillator':
        dispatch({
          type: Oscillator_SettingsActionTypes.UpdateSettings,
          payload: { id: label, parent, value: newValue },
        });
        break;

      case 'noiseOsc':
        dispatch({
          type: Noise_SettingsActionTypes.UpdateSettings,
          payload: { value: newValue },
        });
        break;

      case 'envelope':
        dispatch({
          type: Envelope_ActionTypes.UpdateSettings,
          payload,
        });
        break;

      case 'lfo':
        dispatch({
          type: LFO_SettingsActionTypes.UpdateSettings,
          payload,
        });
        break;

      case 'filter':
        dispatch({
          type: Filter_ActionTypes.UpdateSettings,
          payload,
        });
        break;

      case FXs.DISTORTION:
        if (activeDistortion.clippingIsActive) {
          dispatch({
            type: Distortion_ActionTypes.UpdateSettingsClipping,
            payload,
          });
        } else if (activeDistortion.bitCrusherIsActive) {
          dispatch({
            type: Distortion_ActionTypes.UpdateSettingsBitcrusher,
            payload,
          });
        }
        break;

      case FXs.PHASER:
        dispatch({
          type: Phaser_ActionTypes.UpdateSettings,
          payload,
        });
        break;

      case FXs.CHORUS:
        dispatch({
          type: Chorus_ActionTypes.UpdateSettings,
          payload,
        });
        break;

      case FXs.DELAY:
        dispatch({
          type: Delay_ActionTypes.UpdateSettings,
          payload: { id: label, value: newValue },
        });
        break;

      case FXs.REVERB:
        dispatch({
          type: Reverb_ActionTypes.UpdateSettings,
          payload: { id: label, value: newValue },
        });
        break;

      case FXs.COMPRESSOR:
        dispatch({
          type: Compressor_ActionTypes.UpdateSettings,
          payload: { id: label, value: newValue },
        });
        break;

      default:
        break;
    }
  };

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
    case ControlTypes.PHASER:
      indicatorRingFillColor = theme.phaserColor;
      indicatorDotFillColor = theme.phaserColor;
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
            onInput={(e) =>
              applyValue(
                clampValue(parseFloat(e.currentTarget.value), min, max),
              )
            }
            onDoubleClick={() => {
              document.body.classList.remove('knob-input__drag-active');
              setIsActiveDrag(false);
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
