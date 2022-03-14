import { UserOnServerType } from 'api/types';
import { EntityStatus, UsersReducerStateType } from 'store/reducers/types';
// import { UserType } from 'components/users/types';
// import { ChandlerID, MonicaID, PhoebeID, RossID } from 'store/stubData';

// const initialState: UserType[] = [
//   {
//     id: MonicaID,
//     name: 'Monica',
//     status: 'working',
//     followed: true,
//     avatarURL:
//       'https://cdn.cliqueinc.com/posts/286494/best-friends-outfits-286494-1585661072244-square.700x0c.jpg',
//     location: { country: 'USA', city: 'Boston' },
//   },
//   {
//     id: RossID,
//     name: 'Ross',
//     status: 'reading',
//     followed: false,
//     avatarURL: 'https://i1.sndcdn.com/artworks-000340376244-z775pl-t500x500.jpg',
//     location: { country: 'USA', city: 'New York' },
//   },
//   {
//     id: ChandlerID,
//     name: 'Chandler',
//     status: 'joking',
//     followed: true,
//     avatarURL:
//       'https://www.pinkvilla.com/imageresize/a4a47d837726daa86ece52c8dc5b812a.jpg?width=752&format=webp&t=pvorg',
//     location: { country: 'USA', city: 'LA' },
//   },
//   {
//     id: PhoebeID,
//     name: 'Phoebe',
//     status: 'doing strange things',
//     followed: true,
//     avatarURL: 'https://upload.wikimedia.org/wikipedia/ru/b/b1/Phoebe_buffay.jpg',
//     location: { country: 'USA', city: 'Shamble' },
//   },
// ];

const initialState: UsersReducerStateType = {
  users: [],
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  busyEntities: [],
};

export type usersReducerActionsType =
  | ReturnType<typeof follow>
  | ReturnType<typeof unfollow>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setFetchingTrue>
  | ReturnType<typeof setFetchingFalse>
  | ReturnType<typeof setUserEntityStatus>
  | ReturnType<typeof setUsersListEntityStatus>
  | ReturnType<typeof addToBusyEntities>
  | ReturnType<typeof removeFromBusyEntities>;

export const usersReducer = (
  state: UsersReducerStateType = initialState,
  action: usersReducerActionsType,
): UsersReducerStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userID ? { ...user, followed: true } : user,
        ),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userID ? { ...user, followed: false } : user,
        ),
      };
    case 'SET-USERS':
      return { ...state, users: [...action.users] };
    case 'SET-TOTAL-USERS-COUNT':
      return { ...state, totalCount: action.count };
    case 'SET-CURRENT-PAGE':
      return { ...state, currentPage: action.page };
    case 'SET-FETCHING-TRUE':
      return { ...state, isFetching: true };
    case 'SET-FETCHING-FALSE':
      return { ...state, isFetching: false };
    case 'SET-USER-ENTITY-STATUS':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userID ? { ...user, entityStatus: action.status } : user,
        ),
      };
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

export const follow = (userID: number) =>
  ({
    type: 'FOLLOW',
    userID,
  } as const);

export const unfollow = (userID: number) =>
  ({
    type: 'UNFOLLOW',
    userID,
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

export const setFetchingTrue = () =>
  ({
    type: 'SET-FETCHING-TRUE',
  } as const);

export const setFetchingFalse = () =>
  ({
    type: 'SET-FETCHING-FALSE',
  } as const);

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
