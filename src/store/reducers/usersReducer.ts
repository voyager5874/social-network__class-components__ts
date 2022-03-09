import { UserOnServerType } from 'api/types';
import { userReducerStateType } from 'store/types';
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

const initialState: userReducerStateType = {
  users: [],
  totalCount: 0,
  currentPage: 1,
};

export type usersReducerActionsType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setTotalUsersCountAC>
  | ReturnType<typeof setCurrentPageAC>;

export const usersReducer = (
  state: userReducerStateType = initialState,
  action: usersReducerActionsType,
): userReducerStateType => {
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
    default:
      return state;
  }
};

export const followAC = (userID: number) =>
  ({
    type: 'FOLLOW',
    userID,
  } as const);

export const unfollowAC = (userID: number) =>
  ({
    type: 'UNFOLLOW',
    userID,
  } as const);

export const setUsersAC = (users: UserOnServerType[]) =>
  ({
    type: 'SET-USERS',
    users,
  } as const);

export const setTotalUsersCountAC = (count: number) =>
  ({
    type: 'SET-TOTAL-USERS-COUNT',
    count,
  } as const);

export const setCurrentPageAC = (page: number) =>
  ({
    type: 'SET-CURRENT-PAGE',
    page,
  } as const);
