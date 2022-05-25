import { getInterlocutors } from 'store/middlewares/dialogs';
import { authMeWithAdditionalData } from 'store/middlewares/login';
import { setAppEntityStatus, setAppInitialized } from 'store/reducers/app';
import { EntityStatus } from 'store/reducers/types';
import { ThunkType } from 'store/types';

export const initializeApp = (): ThunkType => async dispatch => {
  dispatch(setAppEntityStatus(EntityStatus.busy));
  const promisesList: Promise<any>[] = [
    dispatch(authMeWithAdditionalData()),
    dispatch(getInterlocutors()),
  ];
  try {
    await Promise.all(promisesList);
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(`initialization: ${error}`);
  }
  dispatch(setAppInitialized());
  dispatch(setAppEntityStatus(EntityStatus.idle));
};
