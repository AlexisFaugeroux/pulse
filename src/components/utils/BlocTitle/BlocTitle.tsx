import { FC } from 'react';
import '../BlocTitle/BlocTitle.scss';
import switchOn from '../../../assets/main-light-switch-on.png';
import switchOff from '../../../assets/main-light-switch-off.png';

interface BlocTitle {
  label: string;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlocTitle: FC<BlocTitle> = ({ label, isActive, setIsActive }) => {
  return (
    <div className="blocTitle-layout">
      <button
        className="button-light"
        onClick={() => setIsActive(!isActive)}
        style={{
          backgroundImage: `url(${isActive ? switchOn : switchOff})`,
          backgroundSize: 'cover',
          borderRadius: '5px',
          objectFit: 'cover',
          cursor: 'pointer',
          border: 'none',
          width: '18px',
          height: '18px',
          marginLeft: '5px',
          zIndex: 150,
        }}
      />
      <h2>{label.toUpperCase()}</h2>
    </div>
  );
};

export default BlocTitle;
