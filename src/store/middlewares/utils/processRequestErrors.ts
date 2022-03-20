import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { BasicResponseType } from 'api/types';
import { FIRST_ARRAY_ITEM_INDEX } from 'constants/base';
import { setAppError } from 'store/reducers/app';
import { Nullable } from 'types';

export const processServerError = <T>(
  caller: string,
  responseData: BasicResponseType<T> | Nullable<string>,
  dispatch: Dispatch,
): void => {
  if (typeof responseData !== 'string' && responseData !== null) {
    // eslint-disable-next-line no-alert
    alert(
      `${caller}: the server respond with resultCode [${responseData.resultCode}] and report: [${responseData.messages[FIRST_ARRAY_ITEM_INDEX]}]`,
    );
    if (responseData.messages.length)
      dispatch(setAppError(responseData.messages[FIRST_ARRAY_ITEM_INDEX]));
  } else if (typeof responseData === 'string') {
    // eslint-disable-next-line no-alert
    alert(`${caller}: the server report: [${responseData}]`);
  } else if (responseData === null) {
    // eslint-disable-next-line no-alert
    alert(`${caller}: the server respond with error but didn't report the reason`);
  }
};

export const processNetworkError = (
  caller: string,
  error: AxiosError,
  dispatch: Dispatch,
): void => {
  // eslint-disable-next-line no-alert
  alert(`${caller}: axios respond with error: [${error.message}]`);
  dispatch(setAppError(error.message));
};

//   data: BaseResponseType<T>,
//   dispatch: Dispatch<AppReducerActionsType>,
// ): void => {
//   if (data.messages.length) {
//     dispatch(setAppErrorAC(data.messages[FIRST_ARRAY_ITEM]));
//   } else {
//     dispatch(setAppErrorAC('some error occurred'));
//   }
//   dispatch(setAppStatusAC('failed'));
// };
