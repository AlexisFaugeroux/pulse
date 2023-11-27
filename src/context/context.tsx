import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import { initialSettings } from '../nodesConfig';
import type { InitialSettingsState } from '../types/types';
import { mainReducer } from './reducers/mainReducer';
import type {
  Gain_SettingsActions,
  Oscillator_SettingsActions,
} from './types/index';

const Context = createContext<{
  state: InitialSettingsState;
  dispatch: Dispatch<Oscillator_SettingsActions | Gain_SettingsActions>;
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
