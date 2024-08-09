import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import { initialSettings } from '../nodesConfig';
import type { InitialSettingsState } from '../types/types';
import { mainReducer } from './reducers/mainReducer';
import type {
  Chorus_SettingsActions,
  Delay_SettingsActions,
  Envelope_SettingsActions,
  Filter_SettingsActions,
  Phaser_SettingsActions,
  LFO_SettingsActions,
  Oscillator_SettingsActions,
  Oscillator_TriggerActions,
} from './types';
import { Compressor_SettingsActions } from './types/compressor';
import { Distortion_SettingsActions } from './types/distortion';
import { Master_Actions } from './types/master';
import { Noise_SettingsActions } from './types/noises';
import { Reverb_SettingsActions } from './types/reverb';

const SettingsContext = createContext<{
  state: InitialSettingsState;

  dispatch: Dispatch<
    | Master_Actions
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Noise_SettingsActions
    | Envelope_SettingsActions
    | LFO_SettingsActions
    | Filter_SettingsActions
    | Distortion_SettingsActions
    | Phaser_SettingsActions
    | Chorus_SettingsActions
    | Delay_SettingsActions
    | Reverb_SettingsActions
    | Compressor_SettingsActions
  >;
}>({
  state: initialSettings,
  dispatch: () => null,
});

const Provider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(mainReducer, initialSettings);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { Provider, SettingsContext };
