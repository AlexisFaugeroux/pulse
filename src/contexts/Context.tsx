import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import { initialSettings } from '../nodesConfig';
import type { InitialSettingsState } from '../types/types';
import { mainReducer } from './reducers/mainReducer';
import type {
  Envelope_SettingsActions,
  Filter_SettingsActions,
  Oscillator_SettingsActions,
  Oscillator_TriggerActions,
  Gain_SettingsActions,
  LFO_SettingsActions,
} from './types';

const SettingsContext = createContext<{
  state: Pick<
    InitialSettingsState,
    'envelope' | 'oscillators' | 'filter' | 'gains' | 'lfo'
  >;
  dispatch: Dispatch<
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Gain_SettingsActions
    | Envelope_SettingsActions
    | LFO_SettingsActions
    | Filter_SettingsActions
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

export { SettingsContext, Provider };
