import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { setUserProfile } from 'store/reducers/userProfileReducer';

export const getUserProfile = (userID: number) => (dispatch: Dispatch) => {
  usersAPI.getUserProfile(userID).then(response => {
    if (response.data.userId) {
      dispatch(setUserProfile(response.data));
    }
  });
};
