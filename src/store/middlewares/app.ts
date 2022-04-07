import { authMeWithAdditionalData } from 'store/middlewares/login';
import { setAppEntityStatus, setAppInitialized } from 'store/reducers/app';
import { EntityStatus } from 'store/reducers/types';
import { ThunkType } from 'store/types';

// thunk type! this is thunk creator dispatch inside thunk creator

// export const initializeApp = (): ThunkType => async dispatch => {
//   dispatch(setAppEntityStatus(EntityStatus.busy));
//   const promisesList = [await dispatch(authMeWithAdditionalData())];
//   Promise.all(promisesList)
//     .then(() => {
//       dispatch(setAppInitialized());
//     })
//     .catch(error => {
//       // eslint-disable-next-line no-alert
//       alert(JSON.stringify(error));
//     });
// };

export const initializeApp = (): ThunkType => async dispatch => {
  dispatch(setAppEntityStatus(EntityStatus.busy));
  const promisesList = [dispatch(authMeWithAdditionalData())];
  try {
    await Promise.all(promisesList);
    dispatch(setAppInitialized());
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(`app initialization failure ${error}`);
  }
  dispatch(setAppEntityStatus(EntityStatus.idle));
};
