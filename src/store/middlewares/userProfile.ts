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

// export const updateCurrentUserStatus = (statusText: string) => (dispatch: Dispatch) => {
//   dispatch(setUserProfileEntityStatus(EntityStatus.busy));
//   usersAPI
//     .updateCurrentUserStatus(statusText)
//     .then(response => {
//       if (response.data.resultCode === ResponseCodes.Success) {
//         dispatch(setUserStatus(statusText));
//       } else {
//         processServerError('updateCurrentStatus(TC)', response.data, dispatch);
//       }
//     })
//     .catch((error: AxiosError) => {
//       processNetworkError('updateCurrentStatus(TC)', error, dispatch);
//     })
//     .finally(() => {
//       dispatch(setUserProfileEntityStatus(EntityStatus.idle));
//     });
// };

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
