import { authMe } from 'store/middlewares/login';
import { setAppEntityStatus, setAppInitialized } from 'store/reducers/app';
import { EntityStatus } from 'store/reducers/types';

// export const initializeApp = () => (dispatch: Dispatch) => {
//   dispatch(setUserProfileEntityStatus(EntityStatus.busy));
//   authAPI
//     .authMe()
//     .then(response => {
//       if (response.data.resultCode === ResponseCodes.Success) {
//         dispatch(setAuthData(response.data.data));
//         dispatch(setLoginStatus(true));
//       } else {
//         processServerError('initializeApp(TC) authMe', response.data, dispatch);
//       }
//       dispatch(setAppInitialized());
//     })
//     .catch((error: AxiosError) => {
//       processNetworkError('initializeApp(TC) authMe request', error, dispatch);
//     })
//     .finally(() => {
//       dispatch(setUserProfileEntityStatus(EntityStatus.idle));
//     });
// };

// thunk type! this is thunk creator dispatch inside thunk creator

export const initializeApp = () => (dispatch: any) => {
  debugger;
  dispatch(setAppEntityStatus(EntityStatus.busy));
  const promisesList = [dispatch(authMe())];
  Promise.all(promisesList)
    .then(() => {
      dispatch(setAppInitialized());
    })
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(error));
    });
};
