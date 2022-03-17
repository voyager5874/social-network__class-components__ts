import { Dispatch } from 'redux';

import { authAPI } from 'api/authAPI';
import { ResponseCodes } from 'enums';
import { setAuthData, setLoginStatus } from 'store/reducers/authReducer';

export const authCurrentUser = () => (dispatch: Dispatch) => {
  authAPI.authMe().then(response => {
    if (response.data.resultCode === ResponseCodes.Success) {
      dispatch(setAuthData(response.data.data));
      dispatch(setLoginStatus(true));
    }
  });
};
