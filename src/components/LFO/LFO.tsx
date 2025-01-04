import { type FC, useContext } from 'react';
import activeIcon from '../../assets/octave-light-switch-active.png';
import inactiveIcon from '../../assets/octave-light-switch-inactive.png';
import { SettingsContext } from '../../contexts/Context';
import { LFO_SettingsActionTypes } from '../../contexts/types';
import { ControlTypes, LFOMode, Waves } from '../../utils/constants';
import { BlocTitle } from '../utils/BlocTitle/BlocTitle';
import { InactivePanel } from '../utils/InactivePanel/InactivePanel';
import { Knob } from '../utils/Knob/Knob';
import { WaveSelector } from '../utils/WaveSelector/WaveSelector';
import './LFO.scss';

export const LFO: FC = () => {
  const {
    state: { lfo },
    dispatch,
  } = useContext(SettingsContext);

  const waves = [Waves.SINE, Waves.SQUARE];

  return (
    <div className="lfo">
      <InactivePanel isActive={lfo.isActive} />
      <div className="lfo-background">
        <BlocTitle label="lfo" isActive={lfo.isActive} parent="lfo" />
        <WaveSelector parent="lfo" waves={waves} activeWave={lfo.type} />
        <div className="lfo-selector">
          <div className="selector-option">
            <button
              className="selector-option-light"
              style={{
                backgroundImage: `url(${
                  lfo.mode === LFOMode.TREMOLO ? activeIcon : inactiveIcon
                })`,
              }}
              onClick={() => {
                if (lfo.isActive) {
                  dispatch({
                    type: LFO_SettingsActionTypes.UpdateMode,
                    payload: { mode: LFOMode.TREMOLO },
                  });
                }
              }}
            />
            <span className="selector-option-label">TREMOLO</span>
          </div>
          <div className="selector-option">
            <button
              className="selector-option-light"
              style={{
                backgroundImage: `url(${
                  lfo.mode === LFOMode.VIBRATO ? activeIcon : inactiveIcon
                })`,
              }}
              onClick={() => {
                if (lfo.isActive) {
                  dispatch({
                    type: LFO_SettingsActionTypes.UpdateMode,
                    payload: { mode: LFOMode.VIBRATO },
                  });
                }
              }}
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
