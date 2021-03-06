import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { ResponseCodes } from 'enums';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import { EntityStatus } from 'store/reducers/types';
import { setFollowedStatus } from 'store/reducers/userProfileReducer';
import {
  addToBusyEntities,
  removeFromBusyEntities,
  setFollowedByCurrentUserState,
  setTotalUsersCount,
  setUserEntityStatus,
  setUsers,
  setUsersListEntityStatus,
} from 'store/reducers/usersReducer';
import { AppActionsType, RootStateType } from 'store/types';

export const getUsers =
  (pageNumber: number, usersPerPage: number) =>
  async (dispatch: Dispatch<AppActionsType>) => {
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

// export const changePerPageUserCount = (newCount: number) => (dispatch: Dispatch) => {
//   dispatch(setUsersPerPageCount(newCount));
// };

export const changeFollowedByCurrentUserState =
  (userID: number, follow: boolean) =>
  async (dispatch: Dispatch<AppActionsType>, getState: () => RootStateType) => {
    dispatch(addToBusyEntities(userID));
    dispatch(setUserEntityStatus(userID, EntityStatus.busy));
    // const currentUserID = getState().authData.id;
    const loadedProfileID = getState().userProfile.profileData.userId;
    const apiCall = follow ? usersAPI.followUser : usersAPI.unfollowUser;
    try {
      const response = await apiCall(userID);
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setFollowedByCurrentUserState(userID, follow));
        if (userID === loadedProfileID) {
          dispatch(setFollowedStatus(follow));
        }
      } else {
        processServerError('unfollow(TC)', response.data, dispatch);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        processNetworkError('unfollow(TC)', error, dispatch);
      }
    } finally {
      dispatch(removeFromBusyEntities(userID));
      dispatch(setUserEntityStatus(userID, EntityStatus.idle));
    }
  };
