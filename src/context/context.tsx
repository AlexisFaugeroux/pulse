import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import { initialSettings } from '../nodesConfig';
import { InitialSettingsState } from '../types/types';
import { mainReducer } from './reducers';
import type { OscillatorSettingsActions } from './type';

const Context = createContext<{
  state: InitialSettingsState;
  dispatch: Dispatch<OscillatorSettingsActions>;
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
