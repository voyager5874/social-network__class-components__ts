import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { ResponseCodes } from 'enums';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import { EntityStatus } from 'store/reducers/types';
import {
  addToBusyEntities,
  removeFromBusyEntities,
  setFollowedByCurrentUserState,
  setTotalUsersCount,
  setUsers,
  setUsersListEntityStatus,
} from 'store/reducers/usersReducer';

export const getUsers =
  (pageNumber: number, usersPerPage: number) => async (dispatch: Dispatch) => {
    // dispatch(setFetchingTrue());
    dispatch(setUsersListEntityStatus(EntityStatus.busy));
    try {
      const response = await usersAPI.getUsers(pageNumber, usersPerPage);
      if (response.data.totalCount) {
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount));
      } else {
        processServerError('getUsers(TC)', response.data.error, dispatch);
      }
    } catch (error) {
      processNetworkError('getUsers(TC)', error as AxiosError, dispatch);
    }
    dispatch(setUsersListEntityStatus(EntityStatus.idle));
  };

// export const getUsers =
//   (pageNumber: number, usersPerPage: number) => (dispatch: Dispatch) => {
//     // dispatch(setFetchingTrue());
//     dispatch(setUsersListEntityStatus(EntityStatus.busy));
//     usersAPI
//       .getUsers(pageNumber, usersPerPage)
//       .then(response => {
//         if (response.data.totalCount) {
//           dispatch(setUsers(response.data.items));
//           dispatch(setTotalUsersCount(response.data.totalCount));
//         } else {
//           processServerError('getUsers(TC)', response.data.error, dispatch);
//         }
//       })
//       .catch((error: AxiosError) => {
//         processNetworkError('getUsers(TC)', error, dispatch);
//       })
//       .finally(() => {
//         // dispatch(setFetchingFalse());
//         dispatch(setUsersListEntityStatus(EntityStatus.idle));
//       });
//   };

// export const follow = (userID: number) => (dispatch: Dispatch) => {
//   dispatch(addToBusyEntities(userID));
//   usersAPI
//     .followUser(userID)
//     .then(response => {
//       if (response.data.resultCode === ResponseCodes.Success) {
//         dispatch(setFollowedByCurrentUserState(userID, true));
//       } else {
//         processServerError('follow(TC)', response.data, dispatch);
//       }
//     })
//     .catch((error: AxiosError) => {
//       processNetworkError('follow(TC)', error, dispatch);
//     })
//     .finally(() => {
//       dispatch(removeFromBusyEntities(userID));
//     });
// };

// export const unfollow = (userID: number) => (dispatch: Dispatch) => {
//   dispatch(addToBusyEntities(userID));
//   usersAPI
//     .unfollowUser(userID)
//     .then(response => {
//       if (response.data.resultCode === ResponseCodes.Success) {
//         dispatch(setFollowedByCurrentUserState(userID, false));
//       } else {
//         processServerError('unfollow(TC)', response.data, dispatch);
//       }
//     })
//     .catch((error: AxiosError) => {
//       processNetworkError('unfollow(TC)', error, dispatch);
//     })
//     .finally(() => {
//       dispatch(removeFromBusyEntities(userID));
//     });
// };

export const changeFollowedByCurrentUserState =
  // eslint-disable-next-line @typescript-eslint/no-shadow
  (userID: number, follow: boolean) => async (dispatch: Dispatch) => {
    dispatch(addToBusyEntities(userID));
    const apiCall = follow ? usersAPI.followUser : usersAPI.unfollowUser;
    try {
      const response = await apiCall(userID);
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setFollowedByCurrentUserState(userID, follow));
      } else {
        processServerError('unfollow(TC)', response.data, dispatch);
      }
    } catch (error) {
      processNetworkError('unfollow(TC)', error as AxiosError, dispatch);
    }

    dispatch(removeFromBusyEntities(userID));
  };
