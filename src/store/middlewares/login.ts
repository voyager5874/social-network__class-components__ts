import { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { Dispatch } from 'redux';

import { authAPI, usersAPI } from 'api';
import { LoginDataType } from 'api/types';
import { FIRST_ARRAY_ITEM_INDEX } from 'constants/base';
import { ResponseCodes } from 'enums';
import { initializeApp } from 'store/middlewares/app';
import { getProfile, getUserStatus } from 'store/middlewares/userProfile';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import {
  AuthReducerActionsType,
  resetAuthState,
  setAuthData,
  setCaptcha,
  setLoggedInUserFullName,
  setLoggedInUserPhoto,
  setLoginStatus,
} from 'store/reducers/authReducer';
import { resetMessagesReducerState } from 'store/reducers/messagesReducer';
import { EntityStatus } from 'store/reducers/types';
import { setUserProfileEntityStatus } from 'store/reducers/userProfileReducer';
import { AppActionsType, ThunkType } from 'store/types';
import {
  addDataToLocalStorage,
  deleteAppDataFromLocalStorage,
} from 'utils/localStorageUtils';

export const getCaptcha = () => async (dispatch: Dispatch<AuthReducerActionsType>) => {
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

export const login =
  (
    data: LoginDataType,
    setFormikSubmitting: FormikHelpers<LoginDataType>['setSubmitting'],
    setFormikStatus: FormikHelpers<LoginDataType>['setStatus'],
  ): ThunkType =>
  async dispatch => {
    dispatch(setUserProfileEntityStatus(EntityStatus.busy));
    setFormikSubmitting(true);
    try {
      const response = await authAPI.login(data);
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setLoginStatus(true));
        dispatch(getProfile(response.data.data.userId));
        dispatch(getUserStatus(response.data.data.userId));
        dispatch(initializeApp()); //  App -> useEffect or this one ? use authMe instead ?
        dispatch(setCaptcha(null));
      }
      if (response.data.resultCode === ResponseCodes.CaptchaRequired) {
        dispatch(getCaptcha());
        setFormikStatus(response.data.messages[FIRST_ARRAY_ITEM_INDEX]);
      } else {
        // processServerError('login(TC)', response.data, dispatch);
        setFormikStatus(response.data.messages[FIRST_ARRAY_ITEM_INDEX]);
      }
    } catch (error) {
      // processNetworkError('login(TC)', error as AxiosError, dispatch);
      setFormikStatus((error as AxiosError).message);
    }

    dispatch(setUserProfileEntityStatus(EntityStatus.idle)); // move to process RequestErrors ?
    setFormikSubmitting(false);
  };

export const logout = () => (dispatch: Dispatch<AppActionsType>) => {
  authAPI
    .logout()
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        // dispatch(setLoginStatus(false));
        dispatch(resetAuthState());
        dispatch(resetMessagesReducerState());
        deleteAppDataFromLocalStorage();
      } else {
        processServerError('logout(TC)', response.data, dispatch);
      }
    })
    .catch((error: AxiosError) => {
      processNetworkError('logout(TC)', error, dispatch);
    });
};

// export const authMe = () => (dispatch: Dispatch) =>
//   authAPI
//     .authMe()
//     .then(response => {
//       if (response.data.resultCode === ResponseCodes.Success) {
//         dispatch(setAuthData(response.data.data));
//         dispatch(setLoginStatus(true));
//       } else {
//         processServerError('authMe(TC)', response.data, dispatch);
//       }
//     })
//     .catch(error => {
//       processNetworkError('auth(TC)', error, dispatch);
//     });

export const authMeWithAdditionalData =
  () =>
  async (
    dispatch: Dispatch<AuthReducerActionsType>,
  ): Promise<boolean | string | Error> => {
    // no need to return anything, I'm just experimenting
    try {
      const response = await authAPI.authMe();
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setAuthData(response.data.data));
        dispatch(setLoginStatus(true));

        // there must be better ways but...
        addDataToLocalStorage('loggedInUserID', response.data.data.id);
        const loggedInUserData = await usersAPI.getUserProfile(response.data.data.id!);
        if (loggedInUserData.data.fullName) {
          dispatch(setLoggedInUserFullName(loggedInUserData.data.fullName));
        }
        if (loggedInUserData.data.photos.small) {
          dispatch(setLoggedInUserPhoto(loggedInUserData.data.photos.small));
        }
        return true;
      }
      processServerError('authMe(TC)', response.data, dispatch);
      return false;
      //
    } catch (error) {
      processNetworkError('auth(TC)', error as AxiosError, dispatch);
      throw new Error((error as AxiosError).message);
    }
  };
