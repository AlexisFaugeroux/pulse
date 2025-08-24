import { useEffect, useState } from 'react';
import { presets } from '../presets/presets';
import { Preset_SettingsActionTypes } from '../contexts/types/preset';
import { SettingsContext } from '../contexts/Context';
import { useContext } from 'react';

export function useCurrentPreset(): [string, () => void, () => void] {
  const { dispatch } = useContext(SettingsContext);
  const [index, setIndex] = useState(0);

  const numberOfPresets = presets.length;

  function setNextPreset() {
    setIndex((prev) => (prev + 1) % numberOfPresets);
  }

  function setPreviousPreset() {
    setIndex((prev) => (prev - 1 + numberOfPresets) % numberOfPresets);
  }

  useEffect(() => {
    dispatch({
      type: Preset_SettingsActionTypes.Update,
      payload: presets[index].settings,
    });
  }, [index, dispatch]);

  return [presets[index].name, setNextPreset, setPreviousPreset];
}
