import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { authAPI } from 'api/authAPI';
import { ResponseCodes } from 'enums';
import { setAuthData, setLoginStatus } from 'store/reducers/authReducer';
import { EntityStatus } from 'store/reducers/types';
import { setUserProfileEntityStatus } from 'store/reducers/userProfileReducer';

export const authCurrentUser = () => (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  authAPI
    .authMe()
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setAuthData(response.data.data));
        dispatch(setLoginStatus(true));
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
