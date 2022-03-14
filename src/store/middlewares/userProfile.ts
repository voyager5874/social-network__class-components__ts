import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { EntityStatus } from 'store/reducers/types';
import {
  setUserProfile,
  setUserProfileEntityStatus,
} from 'store/reducers/userProfileReducer';

export const getUserProfile = (userID: number) => (dispatch: Dispatch) => {
  dispatch(setUserProfileEntityStatus(EntityStatus.busy));
  usersAPI.getUserProfile(userID).then(response => {
    if (response.data.userId) {
      dispatch(setUserProfile(response.data));
    }
    dispatch(setUserProfileEntityStatus(EntityStatus.idle));
  });
};
