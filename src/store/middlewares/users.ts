import { AxiosError } from 'axios';
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
  setUsers,
  setUsersListEntityStatus,
} from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';

export const getUsers =
  (pageNumber: number, usersPerPage: number) => async (dispatch: Dispatch) => {
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

export const changeFollowedByCurrentUserState =
  (userID: number, follow: boolean) =>
  async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(addToBusyEntities(userID));
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
      processNetworkError('unfollow(TC)', error as AxiosError, dispatch);
    }

    dispatch(removeFromBusyEntities(userID));
  };
