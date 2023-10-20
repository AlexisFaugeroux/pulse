import { FC, useState } from 'react';
import '../BlocTitle/BlocTitle.scss';
import switchOn from '../../../assets/main-light-switch-on.png';
import switchOff from '../../../assets/main-light-switch-off.png';

interface BlocTitle {
  label: string;
}

const BlocTitle: FC<BlocTitle> = ({ label }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="blocTitle-layout">
      <button
        className="button-light"
        onClick={() => setIsActive(!isActive)}
        style={{
          backgroundImage: `url(${isActive ? switchOn : switchOff})`,
          backgroundSize: 'cover',
          borderRadius: '7px',
          objectFit: 'cover',
          cursor: 'pointer',
          border: 'none',
          width: '20px',
          height: '20px',
          marginLeft: '5px',
        }}
      />
      <h2>{label.toUpperCase()}</h2>
    </div>
  );
};

export default BlocTitle;
