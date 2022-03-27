import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { authAPI } from 'api/authAPI';
import { LoginDataType } from 'api/types';
import { ResponseCodes } from 'enums';
import { initializeApp } from 'store/middlewares/app';
import { getProfile, getUserStatus } from 'store/middlewares/userProfile';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import {
  resetAuthState,
  setAuthData,
  setCaptcha,
  setLoginStatus,
} from 'store/reducers/authReducer';
import { EntityStatus } from 'store/reducers/types';
import { setUserProfileEntityStatus } from 'store/reducers/userProfileReducer';

export const login = (data: LoginDataType) => (dispatch: any) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy)); // should I create such state for the whole app ?
  authAPI
    .login(data)
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setLoginStatus(true));
        dispatch(getProfile(response.data.data.userId));
        dispatch(getUserStatus(response.data.data.userId));
        dispatch(initializeApp()); //  App -> useEffect or this one ? use authMe instead ?
      } else {
        processServerError('login(TC)', response.data, dispatch);
      }
    })
    .catch((error: AxiosError) => {
      processNetworkError('login(TC)', error, dispatch);
    })
    .finally(() => {
      dispatch(setUserProfileEntityStatus(EntityStatus.idle)); // move to process RequestErrors ?
    });
};

export const logout = () => (dispatch: Dispatch) => {
  authAPI
    .logout()
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        // dispatch(setLoginStatus(false));
        dispatch(resetAuthState());
      } else {
        processServerError('logout(TC)', response.data, dispatch);
      }
    })
    .catch((error: AxiosError) => {
      processNetworkError('logout(TC)', error, dispatch);
    });
};

export const authMe = () => (dispatch: Dispatch) =>
  authAPI
    .authMe()
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setAuthData(response.data.data));
        dispatch(setLoginStatus(true));
      } else {
        processServerError('authMe(TC)', response.data, dispatch);
      }
    })
    .catch(error => {
      processNetworkError('auth(TC)', error, dispatch);
    });

export const getCaptcha = () => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.getCaptcha();
    if (response) {
      dispatch(setCaptcha(response.url));
    } else {
      processServerError('getCaptcha', '?', dispatch);
    }
  } catch (error) {
    processNetworkError('getCaptcha', error as AxiosError, dispatch);
  }
};
