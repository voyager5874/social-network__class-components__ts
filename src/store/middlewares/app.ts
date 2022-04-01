import { authMeWithAdditionalData } from 'store/middlewares/login';
import { setAppEntityStatus, setAppInitialized } from 'store/reducers/app';
import { EntityStatus } from 'store/reducers/types';

// thunk type! this is thunk creator dispatch inside thunk creator

export const initializeApp = () => (dispatch: any) => {
  dispatch(setAppEntityStatus(EntityStatus.busy));
  const promisesList = [dispatch(authMeWithAdditionalData())];
  Promise.all(promisesList)
    .then(() => {
      dispatch(setAppInitialized());
    })
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(error));
    });
};
