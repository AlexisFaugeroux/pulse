import { type ChangeEvent, type FC, useContext } from 'react';
import activeIcon from '../../../assets/octave-light-switch-active.png';
import inactiveIcon from '../../../assets/octave-light-switch-inactive.png';
import { SettingsContext } from '../../../contexts/Context';
import { Oscillator_SettingsActionTypes } from '../../../contexts/types';
import './OctaveSelector.scss';

interface OctaveSelectorProps {
  initialOctaveOffset: number;
  size: 3 | 5 | 7;
  parent: string;
}

export const OctaveSelector: FC<OctaveSelectorProps> = ({
  initialOctaveOffset,
  size,
  parent,
}) => {
  const { dispatch } = useContext(SettingsContext);

  const min = (1 - size) / 2;
  const max = (size - 1) / 2;

  const values = [];
  for (let i = min; i < max + 1; i++) {
    values.push(i > 0 ? `+${i.toString()}` : i.toString());
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    dispatch({
      type: Oscillator_SettingsActionTypes.UpdateSettings,
      payload: {
        id: 'octaveOffset',
        parent,
        value: newValue,
      },
    });
  }

  return (
    <div
      className={`octave-selector-layout ${size === 3 ? 'octave-selector-layout__small' : ''
        }`}
    >
      <div className="rangeWrap">
        <datalist id="values">
          {values.map((value) => (
            <div key={`lights${value}`} className="lights">
              <button
                key={`button${value}`}
                className="light"
                style={{
                  backgroundImage: `url(${initialOctaveOffset === parseInt(value, 10)
                      ? activeIcon
                      : inactiveIcon
                    })`,
                  backgroundSize: 'cover',
                  backgroundColor: 'transparent',
                  border: 'none',
                  objectFit: 'cover',
                  width: '12px',
                  height: '12px',
                }}
              />

              <option
                key={`option${value}`}
                value={value}
                label={value.toString()}
              />
            </div>
          ))}
        </datalist>
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={initialOctaveOffset}
          onChange={handleOnChange}
          list="values"
        />
      </div>
      <div className="label">OCTAVE</div>
    </div>
  );
};
