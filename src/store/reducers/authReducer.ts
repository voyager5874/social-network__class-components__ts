import { AuthMeResponseDataType } from 'api/types';
import { AuthReducerStateType } from 'store/reducers/types';

const initialState: AuthReducerStateType = {
  id: null,
  login: null,
  email: null,
  isLoggedIn: false,
  captcha: null,
};

export type AuthReducerActionType =
  | ReturnType<typeof setAuthData>
  | ReturnType<typeof setLoginStatus>
  | ReturnType<typeof resetAuthState>
  | ReturnType<typeof setCaptcha>;

export const authReducer = (
  state: AuthReducerStateType = initialState,
  action: AuthReducerActionType,
): AuthReducerStateType => {
  switch (action.type) {
    case 'SET-AUTH-DATA':
      return { ...state, ...action.data };
    case 'SET-LOGIN-STATE':
      return { ...state, isLoggedIn: action.loginStatus };
    case 'SET-CAPTCHA':
      return { ...state, captcha: action.url };
    case 'RESET-AUTH-STATE':
      return { isLoggedIn: false, login: null, email: null, id: null, captcha: null };
    default:
      return state;
  }
};

export const setAuthData = (data: AuthMeResponseDataType) =>
  ({
    type: 'SET-AUTH-DATA',
    data,
  } as const);

export const resetAuthState = () =>
  ({
    type: 'RESET-AUTH-STATE',
  } as const);

export const setLoginStatus = (loginStatus: boolean) =>
  ({
    type: 'SET-LOGIN-STATE',
    loginStatus,
  } as const);

export const setCaptcha = (url: string) =>
  ({
    type: 'SET-CAPTCHA',
    url,
  } as const);
