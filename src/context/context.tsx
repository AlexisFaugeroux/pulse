import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import { initialSettings } from '../nodesConfig';
import type { InitialSettingsState } from '../types/types';
import { mainReducer } from './reducers/mainReducer';
import type {
  Envelope_SettingsActions,
  Oscillator_SettingsActions,
  Oscillator_TriggerActions,
} from './types/index';

const Context = createContext<{
  state: Pick<InitialSettingsState, 'envelope' | 'oscillators'>;
  dispatch: Dispatch<
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Envelope_SettingsActions
  >;
}>({
  state: initialSettings,
  dispatch: () => null,
});

const Provider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(mainReducer, initialSettings);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
