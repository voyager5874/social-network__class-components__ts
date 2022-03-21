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
  setTotalUsersCount,
  setUserAsFollowed,
  setUserAsUnfollowed,
  setUsers,
  setUsersListEntityStatus,
} from 'store/reducers/usersReducer';

export const getUsers =
  (pageNumber: number, usersPerPage: number) => (dispatch: Dispatch) => {
    // dispatch(setFetchingTrue());
    dispatch(setUsersListEntityStatus(EntityStatus.busy));
    usersAPI
      .getUsers(pageNumber, usersPerPage)
      .then(response => {
        if (response.data.totalCount) {
          dispatch(setUsers(response.data.items));
          dispatch(setTotalUsersCount(response.data.totalCount));
        } else {
          processServerError('getUsers(TC)', response.data.error, dispatch);
        }
      })
      .catch((error: AxiosError) => {
        processNetworkError('getUsers(TC)', error, dispatch);
      })
      .finally(() => {
        // dispatch(setFetchingFalse());
        dispatch(setUsersListEntityStatus(EntityStatus.idle));
      });
  };

export const follow = (userID: number) => (dispatch: Dispatch) => {
  dispatch(addToBusyEntities(userID));
  usersAPI
    .followUser(userID)
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setUserAsFollowed(userID));
      } else {
        processServerError('follow(TC)', response.data, dispatch);
      }
    })
    .catch((error: AxiosError) => {
      processNetworkError('follow(TC)', error, dispatch);
    })
    .finally(() => {
      dispatch(removeFromBusyEntities(userID));
    });
};

export const unfollow = (userID: number) => (dispatch: Dispatch) => {
  dispatch(addToBusyEntities(userID));
  usersAPI
    .unfollowUser(userID)
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setUserAsUnfollowed(userID));
      } else {
        processServerError('unfollow(TC)', response.data, dispatch);
      }
    })
    .catch((error: AxiosError) => {
      processNetworkError('unfollow(TC)', error, dispatch);
    })
    .finally(() => {
      dispatch(removeFromBusyEntities(userID));
    });
};
