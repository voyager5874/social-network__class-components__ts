import { UserOnServerType } from 'api/types';
import { EntityStatus, UsersReducerStateType } from 'store/reducers/types';

const initialState: UsersReducerStateType = {
  users: [],
  totalCount: 0,
  currentPage: 1,
  // isFetching: false, // I'll replace it with entityStatus
  entityStatus: EntityStatus.idle,
  busyEntities: [],
};

export type usersReducerActionsType =
  // | ReturnType<typeof setUserAsFollowed>
  // | ReturnType<typeof setUserAsUnfollowed>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  // | ReturnType<typeof setFetchingTrue>
  // | ReturnType<typeof setFetchingFalse>
  | ReturnType<typeof setUserEntityStatus>
  | ReturnType<typeof setUsersListEntityStatus>
  | ReturnType<typeof addToBusyEntities>
  | ReturnType<typeof removeFromBusyEntities>
  | ReturnType<typeof setFollowedByCurrentUserState>;

export const usersReducer = (
  state: UsersReducerStateType = initialState,
  action: usersReducerActionsType,
): UsersReducerStateType => {
  switch (action.type) {
    // case 'FOLLOW':
    //   return {
    //     ...state,
    //     users: state.users.map(user =>
    //       user.id === action.userID ? { ...user, followed: true } : user,
    //     ),
    //   };
    // case 'UNFOLLOW':
    //   return {
    //     ...state,
    //     users: state.users.map(user =>
    //       user.id === action.userID ? { ...user, followed: false } : user,
    //     ),
    //   };
    case 'SET-FOLLOWED-STATE':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userID ? { ...user, followed: action.followedState } : user,
        ),
      };
    case 'SET-USERS':
      return { ...state, users: [...action.users] };
    case 'SET-TOTAL-USERS-COUNT':
      return { ...state, totalCount: action.count };
    case 'SET-CURRENT-PAGE':
      return { ...state, currentPage: action.page };
    // case 'SET-FETCHING-TRUE':
    //   return { ...state, isFetching: true };
    // case 'SET-FETCHING-FALSE':
    //   return { ...state, isFetching: false };
    case 'SET-USER-ENTITY-STATUS':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userID ? { ...user, entityStatus: action.status } : user,
        ),
      };
    case 'SET-USERS-LIST-ENTITY-STATUS':
      return { ...state, entityStatus: action.status };
    case 'ADD-TO-BUSY-ENTITIES':
      return { ...state, busyEntities: [...state.busyEntities, action.id] };
    case 'REMOVE-FROM-BUSY-ENTITIES':
      return {
        ...state,
        busyEntities: state.busyEntities.filter(id => id !== action.id),
      };
    default:
      return state;
  }
};

// export const setUserAsFollowed = (userID: number) =>
//   ({
//     type: 'FOLLOW',
//     userID,
//   } as const);
//
// export const setUserAsUnfollowed = (userID: number) =>
//   ({
//     type: 'UNFOLLOW',
//     userID,
//   } as const);

export const setFollowedByCurrentUserState = (userID: number, followedState: boolean) =>
  ({
    type: 'SET-FOLLOWED-STATE',
    userID,
    followedState,
  } as const);

// export const setUsersAC = (users: UserOnServerType[]) =>
//   ({
//     type: 'SET-USERS',
//     users,
//   } as const);

export const setUsers = (users: UserOnServerType[]) =>
  ({
    type: 'SET-USERS',
    users: users.map(user => ({ ...user, entityStatus: EntityStatus.idle })),
  } as const);

export const setTotalUsersCount = (count: number) =>
  ({
    type: 'SET-TOTAL-USERS-COUNT',
    count,
  } as const);

export const setCurrentPage = (page: number) =>
  ({
    type: 'SET-CURRENT-PAGE',
    page,
  } as const);

// export const setFetchingTrue = () =>
//   ({
//     type: 'SET-FETCHING-TRUE',
//   } as const);
//
// export const setFetchingFalse = () =>
//   ({
//     type: 'SET-FETCHING-FALSE',
//   } as const);

export const setUserEntityStatus = (userID: number, status: EntityStatus) =>
  ({
    type: 'SET-USER-ENTITY-STATUS',
    userID,
    status,
  } as const);

export const setUsersListEntityStatus = (status: EntityStatus) =>
  ({
    type: 'SET-USERS-LIST-ENTITY-STATUS',
    status,
  } as const);

export const addToBusyEntities = (id: number) =>
  ({
    type: 'ADD-TO-BUSY-ENTITIES',
    id,
  } as const);

export const removeFromBusyEntities = (id: number) =>
  ({
    type: 'REMOVE-FROM-BUSY-ENTITIES',
    id,
  } as const);
