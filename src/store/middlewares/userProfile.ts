import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { UpdateUserProfileRequestDataType } from 'api/types';
import { FIRST_USER_ID } from 'constants/base';
import { ResponseCodes } from 'enums';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import { setLoggedInUserPhoto } from 'store/reducers/authReducer';
import { EntityStatus } from 'store/reducers/types';
import {
  setCurrentUserAvatar,
  setFollowedStatus,
  setUserProfile,
  setUserProfileEntityStatus,
  setUserStatus,
} from 'store/reducers/userProfileReducer';
import { setTotalUsersCount } from 'store/reducers/usersReducer';
import { AppActionsType, RootStateType, ThunkType } from 'store/types';
import { getRandomInteger, validateUserContact } from 'utils';

export const getFollowedStatus =
  (userID: number) => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    try {
      const response = await usersAPI.checkIfUserFollowedByCurrentUser(userID);
      if (response.data) {
        dispatch(setFollowedStatus(true));
      } else {
        dispatch(setFollowedStatus(false));
      }
    } catch (error) {
      processNetworkError('getUsers(TC)', error as AxiosError, dispatch);
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  };

export const getProfile =
  (userID: number): ThunkType =>
  async dispatch => {
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    try {
      const response = await usersAPI.getUserProfile(userID);
      if (response.data.userId) {
        dispatch(setUserProfile(response.data));
        await dispatch(getFollowedStatus(userID));
      } else {
        processServerError(
          'getUserProfile(TC)',
          "server reached but hasn't respond with data",
          dispatch,
        );
      }
    } catch (error) {
      processNetworkError('getUsers(TC)', error as AxiosError, dispatch);
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  };

export const getUserStatus = (userID: number) => (dispatch: Dispatch<AppActionsType>) => {
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
  (statusText: string) => async (dispatch: Dispatch<AppActionsType>) => {
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

export const updateCurrentUserAvatar =
  (image: File) => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    try {
      const response = await usersAPI.putProfilePhoto(image);
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setCurrentUserAvatar(response.data.data.photos));
        dispatch(setLoggedInUserPhoto(response.data.data.photos.small));
      } else {
        processServerError('updateAvatarTC', response.data, dispatch);
      }
    } catch (error) {
      processNetworkError('updateAvatarTC', error as AxiosError, dispatch);
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  };

export const updateCurrentUserProfile =
  (data: Partial<UpdateUserProfileRequestDataType>): ThunkType =>
  async (dispatch, getState: () => RootStateType) => {
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    const currentUserID = getState().authData.id;
    if (!currentUserID) return;
    try {
      const response = await usersAPI.putNewCurrentUserProfileData(data);
      if (response.data.resultCode === ResponseCodes.Success) {
        await dispatch(getProfile(currentUserID));
      } else {
        processServerError('updateProfile(TC)', response.data, dispatch);
      }
    } catch (error) {
      processNetworkError('updateProfile(TC)', error as AxiosError, dispatch);
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  };

export const findRealSamurai =
  (): ThunkType =>
  async (
    dispatch: Dispatch<AppActionsType>,
    getState: () => RootStateType,
  ): Promise<number> => {
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    let usersCount = getState().users.totalCount;
    let userID: number = 0;
    if (!usersCount) {
      try {
        const response = await usersAPI.getUsers(1, 10);
        if (response.data.totalCount) {
          dispatch(setTotalUsersCount(response.data.totalCount));
          usersCount = response.data.totalCount;
        } else {
          processServerError('findRealSamurai', 'no data received', dispatch);
          throw new Error(
            'error receiving users count while running findRealSamurai - server returned no data',
          );
        }
      } catch (error) {
        console.warn(error);
        throw new Error(
          `findRealSamurai: error receiving users count - ${
            (error as AxiosError).message
          }`,
        );
      }
    }

    // if (!usersCount) {
    //   debugger;
    //   const getUsersResponse = await getUsers(1, 10);
    //   console.log(getUsersResponse);
    //   usersCount = getState().users.totalCount;
    // }

    // the function won't get here if getUsers fails but I'm throwing an error anyways
    // because of typescript and Nullable type of totalUsersCount
    const searchProfile = async (): Promise<number | string> => {
      // userID = getRandomInteger(3, usersCount || 23304); // total users count last checked - 18299, but last user ID is 23304
      if (!usersCount) throw new Error('total users count is unknown');
      userID = getRandomInteger(FIRST_USER_ID, usersCount);
      try {
        const response = await usersAPI.getUserProfile(userID);
        if (
          response.data.contacts.github &&
          validateUserContact(response.data.contacts.github, 'github.com/')
        ) {
          return userID;
        }
        await searchProfile();
      } catch (error) {
        console.warn(`there is no user with id ${userID}?`);
        await searchProfile();
      }
      return userID;
    };

    // Do I have to use try/catch for searchProfile ? since there is no error return probably not
    try {
      await searchProfile();
    } catch (error) {
      throw new Error(error as string);
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
    return userID;
  };
