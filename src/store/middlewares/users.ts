import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { ResponseCodes } from 'enums';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import {
  addToBusyEntities,
  removeFromBusyEntities,
  setFetchingFalse,
  setFetchingTrue,
  setTotalUsersCount,
  setUserAsFollowed,
  setUserAsUnfollowed,
  setUsers,
} from 'store/reducers/usersReducer';

export const getUsers =
  (pageNumber: number, usersPerPage: number) => (dispatch: Dispatch) => {
    dispatch(setFetchingTrue());
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
      });
    dispatch(setFetchingFalse());
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
    });
  dispatch(removeFromBusyEntities(userID));
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
    });
  dispatch(removeFromBusyEntities(userID));
};
