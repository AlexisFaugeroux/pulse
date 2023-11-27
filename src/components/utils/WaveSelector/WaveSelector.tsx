import { FC, useContext, useState } from 'react';
import sawtoothActive from '../../../assets/saw-wave-active.png';
import sawtoothInactive from '../../../assets/saw-wave-inactive.png';
import sineActive from '../../../assets/sine-wave-active.png';
import sineInactive from '../../../assets/sine-wave-inactive.png';
import squareActive from '../../../assets/square-wave-active.png';
import squareInactive from '../../../assets/square-wave-inactive.png';
import triangleActive from '../../../assets/triangle-wave-active.png';
import triangleInactive from '../../../assets/triangle-wave-inactive.png';
import { Context } from '../../../context/context';
import { Oscillator_ActionTypes } from '../../../context/types';
import { Waves } from '../../../utils/constants';
import './WaveSelector.scss';

interface WaveSelectorProps {
  parent: string;
  waves: Waves[];
}

const WaveSelector: FC<WaveSelectorProps> = ({ parent, waves }) => {
  const { dispatch } = useContext(Context);
  const [activeWave, setActiveWave] = useState<Waves>(Waves.SINE);

  const wavesToImages = waves.map((wave) => ({
    wave,
    activeImg:
      wave === Waves.SINE
        ? sineActive
        : wave === Waves.TRIANGLE
        ? triangleActive
        : wave === Waves.SAWTOOTH
        ? sawtoothActive
        : wave === Waves.SQUARE
        ? squareActive
        : '',
    inactiveImg:
      wave === Waves.SINE
        ? sineInactive
        : wave === Waves.TRIANGLE
        ? triangleInactive
        : wave === Waves.SAWTOOTH
        ? sawtoothInactive
        : wave === Waves.SQUARE
        ? squareInactive
        : '',
  }));

  return (
    <div className="selector">
      <div className="selector-image">
        {wavesToImages.map(({ wave, activeImg, inactiveImg }) => (
          <button
            key={wave + Date.now()}
            id={wave}
            onClick={() => {
              setActiveWave(wave);
              dispatch({
                type: Oscillator_ActionTypes.UpdateType,
                payload: {
                  id: wave,
                  parent,
                },
              });
            }}
            style={{
              backgroundImage: `url(${
                activeWave === wave ? activeImg : inactiveImg
              })`,
              backgroundSize: 'cover',
              backgroundColor: 'transparent',
              border: 'none',
              objectFit: 'cover',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaveSelector;
