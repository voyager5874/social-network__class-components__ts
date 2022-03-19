import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { authAPI } from 'api/authAPI';
import { LoginDataType } from 'api/types';
import { ResponseCodes } from 'enums';
// import { authCurrentUser } from 'store/middlewares/app';
import { getUserProfile, getUserStatus } from 'store/middlewares/userProfile';
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
        dispatch(getUserProfile(response.data.data.userId));
        dispatch(getUserStatus(response.data.data.userId));
        // dispatch(authCurrentUser()); // there is two authMe request after login (useEffect -> App or this one ?)
      }
      if (response.data.resultCode === ResponseCodes.Error) {
        // eslint-disable-next-line no-alert
        alert(
          `loginTC resultCode is error, the server said: ${response.data.messages[0]}`,
        );
      }
    })
    .catch((error: AxiosError) => {
      // eslint-disable-next-line no-alert
      alert(`loginTC catch, axios says: ${error.message}`);
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
        alert(`logoutTC result code is error, server says: ${response.data.messages[0]}`);
      }
    })
    .catch((error: AxiosError) => {
      // eslint-disable-next-line no-alert
      alert(`logoutTC catch, axios said: ${error.message}`);
    });
};
