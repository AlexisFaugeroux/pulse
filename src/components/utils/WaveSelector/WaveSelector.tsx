import { FC, useState } from 'react';
import './WaveSelector.scss';
import sineActive from '../../../assets/sine-wave-active.png';
import sineInactive from '../../../assets/sine-wave-inactive.png';
import triangleActive from '../../../assets/triangle-wave-active.png';
import triangleInactive from '../../../assets/triangle-wave-inactive.png';
import sawtoothActive from '../../../assets/saw-wave-active.png';
import sawtoothInactive from '../../../assets/saw-wave-inactive.png';
import squareActive from '../../../assets/square-wave-active.png';
import squareInactive from '../../../assets/square-wave-inactive.png';

enum ActiveWave {
  Sine = 'sine',
  Triangle = 'triangle',
  Sawtooth = 'sawtooth',
  Square = 'square',
}

const WaveSelector: FC = () => {
  const [activeWave, setActiveWave] = useState<ActiveWave>(ActiveWave.Sine);

  const wavesToImages = [
    {
      wave: ActiveWave.Sine,
      active: sineActive,
      inactive: sineInactive,
    },
    {
      wave: ActiveWave.Triangle,
      active: triangleActive,
      inactive: triangleInactive,
    },
    {
      wave: ActiveWave.Sawtooth,
      active: sawtoothActive,
      inactive: sawtoothInactive,
    },
    {
      wave: ActiveWave.Square,
      active: squareActive,
      inactive: squareInactive,
    },
  ];

  return (
    <div className="selector">
      <div className="selector-image">
        {wavesToImages.map(({ wave, active, inactive }) => (
          <button
            key={wave}
            onClick={() => setActiveWave(wave)}
            style={{
              backgroundImage: `url(${
                activeWave === wave ? active : inactive
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
