import { FC } from 'react';
import './InactivePanel.scss';

interface InactivePanelProps {
  isActive: boolean;
}

export const InactivePanel: FC<InactivePanelProps> = ({ isActive }) => {
  return (
    <div
      className="inactive-panel"
      style={{
        display: isActive ? 'none' : '',
      }}
    ></div>
  );
};
