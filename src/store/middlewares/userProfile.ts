import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { usersAPI } from 'api';
import { UpdateUserProfileRequestDataType } from 'api/types';
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
  (navigate: any): ThunkType =>
  async (
    dispatch: Dispatch<AppActionsType>,
    getState: () => RootStateType,
  ): Promise<void> => {
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    let usersCount = getState().users.totalCount;
    if (!usersCount) {
      try {
        const response = await usersAPI.getUsers(1, 10);
        if (response.data.totalCount) {
          dispatch(setTotalUsersCount(response.data.totalCount));
          usersCount = response.data.totalCount;
        } else {
          processServerError('findRealSamurai', 'no data received', dispatch);
        }
      } catch (error) {
        console.warn(error);
      }
    }

    // if (!usersCount) {
    //   debugger;
    //   const getUsersResponse = await getUsers(1, 10);
    //   console.log(getUsersResponse);
    //   usersCount = getState().users.totalCount;
    // }
    const findSamurai = async () => {
      const userID: number = getRandomInteger(3, usersCount || 20000);
      try {
        const response = await usersAPI.getUserProfile(userID);
        if (
          response.data.contacts.github &&
          validateUserContact(response.data.contacts.github, 'github.com/')
        ) {
          // dispatch(getUserProfile(userID))
          // return Promise.resolve(userID);
          navigate(`${userID}`);
        } else {
          await findSamurai();
        }
      } catch (error) {
        console.warn(`there is no user with id ${userID}?`);
        await findSamurai();
      }
    };
    await findSamurai();
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  };
