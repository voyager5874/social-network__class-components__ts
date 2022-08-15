import { message } from 'antd';

import { getInterlocutors } from 'store/middlewares/dialogs';
import { authMeWithAdditionalData } from 'store/middlewares/login';
import { setAppEntityStatus, setAppInitialized } from 'store/reducers/app';
import { EntityStatus } from 'store/reducers/types';
import { ThunkType } from 'store/types';

export const initializeApp = (): ThunkType => async dispatch => {
  dispatch(setAppEntityStatus(EntityStatus.busy));
  try {
    const promisesList: Promise<any>[] = [
      dispatch(authMeWithAdditionalData()),
      dispatch(getInterlocutors()),
    ];
    await Promise.all(promisesList);
  } catch (error) {
    message.error(`initialization: ${error}`);
  } finally {
    dispatch(setAppInitialized());
    dispatch(setAppEntityStatus(EntityStatus.idle));
  }
};
