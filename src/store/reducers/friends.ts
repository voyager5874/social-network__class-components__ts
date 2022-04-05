import { UserOnServerType } from 'api/types';
import { EntityStatus, FriendsReducerStateType } from 'store/reducers/types';

const initialState: FriendsReducerStateType = {
  users: [],
  busyEntities: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalCount: null,
  entityStatus: EntityStatus.idle,
};

export type FriendsReducerActionsType =
  | ReturnType<typeof setFriendsList>
  | ReturnType<typeof setFriendsCount>
  | ReturnType<typeof setFriendsListCurrentPage>
  | ReturnType<typeof addToBusyEntities>
  | ReturnType<typeof removeFromBusyEntities>
  | ReturnType<typeof setFriendsListEntityStatus>
  | ReturnType<typeof setFriendsPerPageCount>;

export const friendsReducer = (
  state: FriendsReducerStateType = initialState,
  action: FriendsReducerActionsType,
): FriendsReducerStateType => {
  switch (action.type) {
    case 'FRIENDS/SET-ENTITIES':
      return { ...state, users: action.friends };
    case 'FRIENDS/SET-ENTITIES-COUNT':
      return { ...state, totalCount: action.count };
    case 'FRIENDS/SET-CURRENT-PAGE':
      return { ...state, currentPage: action.page };
    case 'FRIENDS/SET-PER-PAGE-COUNT':
      return { ...state, itemsPerPage: action.count };
    case 'FRIENDS/ADD-TO-BUSY-ENTITIES':
      return { ...state, busyEntities: [...state.busyEntities, action.id] };
    case 'FRIENDS/REMOVE-FROM-BUSY-ENTITIES':
      return {
        ...state,
        busyEntities: state.busyEntities.filter(id => id !== action.id),
      };
    case 'FRIENDS/SET-LIST-ENTITY-STATUS':
      return { ...state, entityStatus: action.status };
    default:
      return state;
  }
};

export const setFriendsList = (friends: UserOnServerType[]) =>
  ({
    type: 'FRIENDS/SET-ENTITIES',
    friends,
  } as const);

export const setFriendsCount = (count: number) =>
  ({
    type: 'FRIENDS/SET-ENTITIES-COUNT',
    count,
  } as const);

export const setFriendsListCurrentPage = (page: number) =>
  ({
    type: 'FRIENDS/SET-CURRENT-PAGE',
    page,
  } as const);

export const setFriendsPerPageCount = (count: number) =>
  ({
    type: 'FRIENDS/SET-PER-PAGE-COUNT',
    count,
  } as const);

export const setFriendsListEntityStatus = (status: EntityStatus) =>
  ({
    type: 'FRIENDS/SET-LIST-ENTITY-STATUS',
    status,
  } as const);

export const addToBusyEntities = (id: number) =>
  ({
    type: 'FRIENDS/ADD-TO-BUSY-ENTITIES',
    id,
  } as const);

export const removeFromBusyEntities = (id: number) =>
  ({
    type: 'FRIENDS/REMOVE-FROM-BUSY-ENTITIES',
    id,
  } as const);
