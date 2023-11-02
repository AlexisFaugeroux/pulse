import { FC, useState } from 'react';
import { Waves } from '../../../utils/constants';
import sineActive from '../../../assets/sine-wave-active.png';
import sineInactive from '../../../assets/sine-wave-inactive.png';
import triangleActive from '../../../assets/triangle-wave-active.png';
import triangleInactive from '../../../assets/triangle-wave-inactive.png';
import sawtoothActive from '../../../assets/saw-wave-active.png';
import sawtoothInactive from '../../../assets/saw-wave-inactive.png';
import squareActive from '../../../assets/square-wave-active.png';
import squareInactive from '../../../assets/square-wave-inactive.png';
import './WaveSelector.scss';

interface WaveSelectorProps {
  waves: Waves[];
}

const WaveSelector: FC<WaveSelectorProps> = ({ waves }) => {
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
            key={wave}
            onClick={() => setActiveWave(wave)}
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
