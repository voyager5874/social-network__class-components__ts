import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { UpdateUserProfileRequestDataType } from 'api/types';
import { ResponseCodes } from 'enums';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import { EntityStatus } from 'store/reducers/types';
import {
  setCurrentUserAvatar,
  setUserProfile,
  setUserProfileEntityStatus,
  setUserStatus,
} from 'store/reducers/userProfileReducer';

export const getUserProfile = (userID: number) => (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  usersAPI
    .getUserProfile(userID)
    .then(response => {
      if (response.data.userId) {
        dispatch(setUserProfile(response.data));
      } else {
        processServerError(
          'getUserProfile(TC)',
          "server reached but hasn't respond with data",
          dispatch,
        );
      }
    })
    .catch((error: AxiosError) => {
      processNetworkError('getUsers(TC)', error, dispatch);
    })
    .finally(() => {
      dispatch(setUserProfileEntityStatus(EntityStatus.idle));
    });
};

export const getUserStatus = (userID: number) => (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  usersAPI
    .getUserStatus(userID)
    .then(response => {
      if (response.data) {
        dispatch(setUserStatus(response.data));
      } else {
        processServerError('getUserStatus(TC)', 'server returned no data', dispatch);
        dispatch(setUserStatus('status not set'));
      }
    })
    .catch((error: AxiosError) => {
      processNetworkError('getUserStatus', error, dispatch);
    })
    .finally(() => {
      dispatch(setUserProfileEntityStatus(EntityStatus.idle));
    });
};

export const updateCurrentUserStatus =
  (statusText: string) => async (dispatch: Dispatch) => {
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    try {
      const response = await usersAPI.updateCurrentUserStatus(statusText);
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setUserStatus(statusText));
      } else {
        processServerError('updateCurrentStatus(TC)', response.data, dispatch);
      }
    } catch (error) {
      processNetworkError('updateCurrentStatus(TC)', error as AxiosError, dispatch);
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  };

export const updateCurrentUserAvatar = (image: File) => async (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  try {
    const response = await usersAPI.putProfilePhoto(image);
    if (response.data.resultCode === ResponseCodes.Success) {
      dispatch(setCurrentUserAvatar(response.data.data.photos));
    } else {
      processServerError('updateAvatarTC', response.data, dispatch);
    }
  } catch (error) {
    processNetworkError('updateAvatarTC', error as AxiosError, dispatch);
  }
  dispatch(setUserProfileEntityStatus(EntityStatus.idle));
};

export const updateCurrentUserProfile =
  (data: Partial<UpdateUserProfileRequestDataType>) =>
  async (dispatch: any, getState: any) => {
    debugger;
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    const currentUserID = getState().authData.id;
    try {
      const response = await usersAPI.putNewCurrentUserProfileData(data);
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(getUserProfile(currentUserID));
      } else {
        processServerError('updateProfile(TC)', response.data, dispatch);
      }
    } catch (error) {
      processNetworkError('updateProfile(TC)', error as AxiosError, dispatch);
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  };
