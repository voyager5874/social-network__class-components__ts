import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { ResponseCodes } from 'enums';
import { EntityStatus } from 'store/reducers/types';
import {
  setUserProfile,
  setUserProfileEntityStatus,
  setUserStatus,
} from 'store/reducers/userProfileReducer';

export const getUserProfile = (userID: number) => (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  usersAPI.getUserProfile(userID).then(response => {
    if (response.data.userId) {
      dispatch(setUserProfile(response.data));
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  });
};

export const getUserStatus = (userID: number) => (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  usersAPI.getUserStatus(userID).then(response => {
    if (response.data) {
      dispatch(setUserStatus(response.data));
    } else {
      dispatch(setUserStatus('status not set or network error'));
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  });
};

export const updateCurrentUserStatus = (statusText: string) => (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  usersAPI.updateCurrentUserStatus(statusText).then(response => {
    if (response.data.resultCode === ResponseCodes.Success) {
      dispatch(setUserStatus(statusText));
    }
    if (response.data.resultCode === ResponseCodes.Error) {
      // eslint-disable-next-line no-alert
      alert('error updating user status');
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  });
};
