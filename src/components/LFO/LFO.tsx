import { FC, useContext, useEffect, useState } from 'react';
import activeIcon from '../../assets/octave-light-switch-active.png';
import inactiveIcon from '../../assets/octave-light-switch-inactive.png';
import { SettingsContext } from '../../contexts/Context';
import { LFO_SettingsActionTypes } from '../../contexts/types';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes, LFOMode, Waves } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import Knob from '../utils/Knob/Knob';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import './LFO.scss';

const LFO: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<LFOMode>(LFOMode.TREMOLO);

  const waves = [Waves.SINE, Waves.SQUARE];
  const { lfo } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: LFO_SettingsActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: LFO_SettingsActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: LFO_SettingsActionTypes.UpdateMode,
        payload: { mode },
      });
    }
  }, [isActive, dispatch, mode]);

  return (
    <div className="lfo">
      <InactivePanel isActive={isActive} />
      <div className="lfo-background">
        <BlocTitle label="lfo" isActive={isActive} setIsActive={setIsActive} />
        <WaveSelector parent="lfo" waves={waves} />
        <div className="lfo-selector">
          <div className="selector-option">
            <button
              className="selector-option-light"
              style={{
                backgroundImage: `url(${
                  mode === LFOMode.TREMOLO ? activeIcon : inactiveIcon
                })`,
              }}
              onClick={() => setMode(LFOMode.TREMOLO)}
            />
            <span className="selector-option-label">TREMOLO</span>
          </div>
          <div className="selector-option">
            <button
              className="selector-option-light"
              style={{
                backgroundImage: `url(${
                  mode === LFOMode.VIBRATO ? activeIcon : inactiveIcon
                })`,
              }}
              onClick={() => setMode(LFOMode.VIBRATO)}
            />
            <span className="selector-option-label">VIBRATO</span>
          </div>
        </div>
        <div className="controls">
          <Knob
            initialValue={lfo.frequency}
            label="rate"
            parent="lfo"
            type={ControlTypes.DEFAULT}
          />
          <Knob
            initialValue={lfo.gain}
            label="level"
            parent="lfo"
            type={ControlTypes.DEFAULT}
          />
        </div>
      </div>
    </div>
  );
};

export default LFO;
