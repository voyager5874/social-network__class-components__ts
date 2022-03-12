import { v1 } from 'uuid';

import { ChandlerID, JoeyID, MonicaID, PhoebeID, RachelID, RossID } from 'store/stubData';
import { InterlocutorsStateType } from 'store/reducers/types';

const initialState: InterlocutorsStateType = [
  { id: RossID, name: 'Ross' },
  { id: MonicaID, name: 'Monica' },
  { id: ChandlerID, name: 'Chandler' },
  { id: RachelID, name: 'Rachel' },
  { id: PhoebeID, name: 'Phoebe' },
  { id: JoeyID, name: 'Joey' },
];

export const interlocutorsReducer = (
  state: InterlocutorsStateType = initialState,
  action: InterlocutorsReducerActionsType,
): InterlocutorsStateType => {
  switch (action.type) {
    case 'ADD-INTERLOCUTOR':
      return [{ id: action.id, name: action.name }, ...state];
    case 'DELETE-INTERLOCUTOR':
      return state.filter(person => person.id !== action.id);
    default:
      return state;
  }
};

export type InterlocutorsReducerActionsType =
  | ReturnType<typeof addInterlocutorAC>
  | ReturnType<typeof deleteInterlocutorAC>;

export const addInterlocutorAC = (name: string) =>
  ({
    type: 'ADD-INTERLOCUTOR',
    name,
    id: v1(),
  } as const);

export const deleteInterlocutorAC = (id: string) =>
  ({
    type: 'DELETE-INTERLOCUTOR',
    id,
  } as const);
