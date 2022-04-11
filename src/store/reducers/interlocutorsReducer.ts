import { InterlocutorType } from 'components/dialogs/types';
import { InterlocutorsStateType } from 'store/reducers/types';

const initialState: InterlocutorsStateType = [];

export const interlocutorsReducer = (
  state: InterlocutorsStateType = initialState,
  action: InterlocutorsReducerActionsType,
): InterlocutorsStateType => {
  switch (action.type) {
    case 'INTERLOCUTORS/ITEMS-LOADED':
      return [...action.data];
    default:
      return state;
  }
};

export type InterlocutorsReducerActionsType =
  | ReturnType<typeof setInterlocutors>
  | ReturnType<typeof addInterlocutor>;

export const addInterlocutor = () =>
  ({
    type: 'INTERLOCUTORS/ITEM-CREATED',
  } as const);

export const setInterlocutors = (data: InterlocutorType[]) =>
  ({
    type: 'INTERLOCUTORS/ITEMS-LOADED',
    data,
  } as const);
