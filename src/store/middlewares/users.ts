import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { ResponseCodes } from 'enums';
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
    usersAPI.getUsers(pageNumber, usersPerPage).then(response => {
      if (response.data.totalCount) {
        dispatch(setFetchingFalse());
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount));
      }
    });
  };

export const follow = (userID: number) => (dispatch: Dispatch) => {
  dispatch(addToBusyEntities(userID));
  usersAPI.followUser(userID).then(response => {
    if (response.data.resultCode === ResponseCodes.Success) {
      dispatch(setUserAsFollowed(userID));
    }
    dispatch(removeFromBusyEntities(userID));
  });
};

export const unfollow = (userID: number) => (dispatch: Dispatch) => {
  dispatch(addToBusyEntities(userID));
  usersAPI.unfollowUser(userID).then(response => {
    if (response.data.resultCode === ResponseCodes.Success) {
      dispatch(setUserAsUnfollowed(userID));
    }
    dispatch(removeFromBusyEntities(userID));
  });
};
