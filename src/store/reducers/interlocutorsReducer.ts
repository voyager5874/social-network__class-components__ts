import { InterlocutorType } from 'components/dialogs/types';
import { InterlocutorsStateType } from 'store/reducers/types';
// import { ChandlerID, JoeyID, MonicaID, PhoebeID, RachelID, RossID } from 'store/stubData';

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

export type InterlocutorsReducerActionsType = ReturnType<typeof setInterlocutors>;

// export const addInterlocutorAC = (name: string) =>
//   ({
//     type: 'ADD-INTERLOCUTOR',
//     name,
//     id: v1(),
//   } as const);
//
// export const deleteInterlocutorAC = (id: string) =>
//   ({
//     type: 'DELETE-INTERLOCUTOR',
//     id,
//   } as const);

export const setInterlocutors = (data: InterlocutorType[]) =>
  ({
    type: 'INTERLOCUTORS/ITEMS-LOADED',
    data,
  } as const);
