import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import {
  setFriendsCount,
  setFriendsList,
  setFriendsListEntityStatus,
} from 'store/reducers/friends';
import { EntityStatus } from 'store/reducers/types';

export const getFriends = () => async (dispatch: Dispatch) => {
  dispatch(setFriendsListEntityStatus(EntityStatus.busy));
  try {
    const response = await usersAPI.getFriendsList();
    if (!response.data.error) {
      dispatch(setFriendsList(response.data.items));
      dispatch(setFriendsCount(response.data.totalCount));
    } else {
      processServerError('getFriends', 'server reached but returned no data', dispatch);
    }
  } catch (error) {
    processNetworkError('getFriends', error as AxiosError, dispatch);
  }
  dispatch(setFriendsListEntityStatus(EntityStatus.idle));
};
