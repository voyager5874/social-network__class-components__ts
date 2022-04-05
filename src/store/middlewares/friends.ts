import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import {
  processNetworkError,
  processServerError,
} from 'store/middlewares/utils/processRequestErrors';
import {
  FriendsReducerActionsType,
  setFriendsCount,
  setFriendsList,
  setFriendsListEntityStatus,
} from 'store/reducers/friends';
import { EntityStatus } from 'store/reducers/types';

export const getFriends =
  (pageNumber: number = 1, pageSize: number = 10) =>
  async (dispatch: Dispatch<FriendsReducerActionsType>) => {
    dispatch(setFriendsListEntityStatus(EntityStatus.busy));
    try {
      const response = await usersAPI.getFriendsList(pageNumber, pageSize);
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
