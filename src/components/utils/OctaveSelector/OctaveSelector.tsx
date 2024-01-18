import { FC, useContext, useEffect, useState } from 'react';
import activeIcon from '../../../assets/octave-light-switch-active.png';
import inactiveIcon from '../../../assets/octave-light-switch-inactive.png';
import { SettingsContext } from '../../../contexts/Context';
import { Oscillator_SettingsActionTypes } from '../../../contexts/types';
import './OctaveSelector.scss';

interface OctaveSelectorProps {
  size: 3 | 5 | 7;
  parent: string;
}

const OctaveSelector: FC<OctaveSelectorProps> = ({ size, parent }) => {
  const { dispatch } = useContext(SettingsContext);
  const [octaveOffset, setOctaveOffset] = useState(0);

  const min = (1 - size) / 2;
  const max = (size - 1) / 2;

  const values = [];
  for (let i = min; i < max + 1; i++) {
    values.push(i > 0 ? `+${i.toString()}` : i.toString());
  }

  useEffect(() => {
    dispatch({
      type: Oscillator_SettingsActionTypes.UpdateSettings,
      payload: {
        id: 'octaveOffset',
        parent,
        value: octaveOffset,
      },
    });
  }, [dispatch, octaveOffset, parent]);

  return (
    <div
      className={`octave-selector-layout ${
        size === 3 ? 'octave-selector-layout__small' : ''
      }`}
    >
      <div className="rangeWrap">
        <datalist id="values">
          {values.map((value) => (
            <div key={`lights${value + Date.now()}`} className="lights">
              <button
                key={`button${value + Date.now()}`}
                className="light"
                style={{
                  backgroundImage: `url(${
                    octaveOffset === parseInt(value, 10)
                      ? activeIcon
                      : inactiveIcon
                  })`,
                  backgroundSize: 'cover',
                  backgroundColor: 'transparent',
                  border: 'none',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  width: '12px',
                  height: '12px',
                }}
              />

              <option
                key={`option${value + Date.now()}`}
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
          value={octaveOffset}
          onChange={(e) => setOctaveOffset(parseInt(e.target.value, 10))}
          list="values"
        />
      </div>
      <div className="label">OCTAVE</div>
    </div>
  );
};

export default OctaveSelector;
