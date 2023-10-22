import { FC, useState } from 'react';
import './OctaveSelector.scss';
import activeIcon from '../../../assets/octave-light-switch-active.png';
import inactiveIcon from '../../../assets/octave-light-switch-inactive.png';

interface OctaveSelectorProps {
  size: 3 | 5 | 7;
}

const OctaveSelector: FC<OctaveSelectorProps> = ({ size }) => {
  const [octaveOffset, setOctaveOffset] = useState(0);

  const min = (1 - size) / 2;
  const max = (size - 1) / 2;

  const values = [];
  for (let i = min; i < max + 1; i++) {
    values.push(i > 0 ? `+${i.toString()}` : i.toString());
  }

  return (
    <div className="octave-selector-layout">
      <div className="rangeWrap">
        <datalist id="values">
          {values.map((value) => (
            <div className="lights">
              <button
                key={value + Date.now()}
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

              <option value={value} label={value.toString()} />
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
