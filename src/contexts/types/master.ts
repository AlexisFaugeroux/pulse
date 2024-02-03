import { ActionMap } from './helpers.ts';

enum Master_ActionTypes {
  UpdateValue = 'MASTER_UPDATE_VALUE',
}

type Master_Payload = {
  [key in Master_ActionTypes]: {
    value: number;
  };
};

type Master_Actions =
  ActionMap<Master_Payload>[keyof ActionMap<Master_Payload>];

export { Master_ActionTypes, type Master_Actions, type Master_Payload };
