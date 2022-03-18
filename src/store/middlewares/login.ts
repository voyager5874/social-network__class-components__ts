import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { authAPI } from 'api/authAPI';
import { LoginDataType } from 'api/types';
import { ResponseCodes } from 'enums';
import { authCurrentUser } from 'store/middlewares/app';
import { setAuthData, setLoginStatus } from 'store/reducers/authReducer';
import { EntityStatus } from 'store/reducers/types';
import { setUserProfileEntityStatus } from 'store/reducers/userProfileReducer';

export const login = (data: LoginDataType) => (dispatch: any) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy)); // should I create such state for the whole app ?
  authAPI
    .login(data)
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setLoginStatus(true));
        dispatch(authCurrentUser());
      }
      if (response.data.resultCode === ResponseCodes.Error) {
        // eslint-disable-next-line no-alert
        alert(response.data.messages[0]);
      }
    })
    .catch((error: AxiosError) => {
      // eslint-disable-next-line no-alert
      alert(error.message);
    });
  dispatch(setUserProfileEntityStatus(EntityStatus.idle));
};

export const logout = () => (dispatch: Dispatch) => {
  authAPI
    .logout()
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setLoginStatus(false));
        dispatch(setAuthData({ id: null, login: null, email: null }));
      }
      if (response.data.resultCode === ResponseCodes.Error) {
        // eslint-disable-next-line no-alert
        alert(response.data.messages[0]);
      }
    })
    .catch((error: AxiosError) => {
      // eslint-disable-next-line no-alert
      alert(error.message);
    });
};
