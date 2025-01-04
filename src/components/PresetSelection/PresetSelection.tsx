import { FC } from 'react';
import { useCurrentPreset } from '../../hooks/useCurrentPreset';

export const PresetSelection: FC = () => {
  const [currentPresetName, setNextPreset, setPreviousPreset] = useCurrentPreset();

  return (
    <div className="preset-selector">
      <button className="arrow-left-button" onClick={setPreviousPreset}>
        <i className="arrow-left"></i>
      </button>
      <div className="preset-sreen">{currentPresetName}</div>
      <button className="arrow-right-button" onClick={setNextPreset}>
        <i className="arrow-right"></i>
      </button>
    </div>
  );
};
