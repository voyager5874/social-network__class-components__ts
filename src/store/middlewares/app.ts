import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { authAPI } from 'api/authAPI';
import { ResponseCodes } from 'enums';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import { setAppInitialized } from 'store/reducers/app';
import { setAuthData, setLoginStatus } from 'store/reducers/authReducer';
import { EntityStatus } from 'store/reducers/types';
import { setUserProfileEntityStatus } from 'store/reducers/userProfileReducer';

export const initializeApp = () => (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  authAPI
    .authMe()
    .then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        dispatch(setAuthData(response.data.data));
        dispatch(setLoginStatus(true));
      } else {
        processServerError('initializeApp(TC) authMe', response.data, dispatch);
      }
      dispatch(setUserProfileEntityStatus(EntityStatus.idle));
      dispatch(setAppInitialized());
    })
    .catch((error: AxiosError) => {
      processNetworkError('initializeApp(TC) authMe request', error, dispatch);
    });
  // dispatch(setUserProfileEntityStatus(EntityStatus.idle));
};
