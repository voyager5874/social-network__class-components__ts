import { AuthMeResponseDataType } from 'api/types';
import { AuthReducerStateType } from 'store/reducers/types';
import { Nullable } from 'types';

const initialState: AuthReducerStateType = {
  id: null,
  login: null,
  email: null,
  isLoggedIn: false,
  captcha: null,
  fullName: null,
  photo: null,
};

export type AuthReducerActionsType =
  | ReturnType<typeof setAuthData>
  | ReturnType<typeof setLoginStatus>
  | ReturnType<typeof resetAuthState>
  | ReturnType<typeof setCaptcha>
  | ReturnType<typeof setLoggedInUserFullName>
  | ReturnType<typeof setLoggedInUserPhoto>;

export const authReducer = (
  state: AuthReducerStateType = initialState,
  action: AuthReducerActionsType,
): AuthReducerStateType => {
  switch (action.type) {
    case 'SET-AUTH-DATA':
      return { ...state, ...action.data };
    case 'SET-LOGIN-STATE':
      return { ...state, isLoggedIn: action.loginStatus };
    case 'SET-CAPTCHA':
      return { ...state, captcha: action.url };
    case 'AUTH/SET-NAME':
      return { ...state, fullName: action.name };
    case 'AUTH/SET-PHOTO':
      return { ...state, photo: action.photo };
    case 'RESET-AUTH-STATE':
      return {
        isLoggedIn: false,
        login: null,
        email: null,
        id: null,
        captcha: null,
        fullName: null,
        photo: null,
      };
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

export const setCaptcha = (url: Nullable<string>) =>
  ({
    type: 'SET-CAPTCHA',
    url,
  } as const);

export const setLoggedInUserFullName = (name: string) =>
  ({
    type: 'AUTH/SET-NAME',
    name,
  } as const);

export const setLoggedInUserPhoto = (photo: string) =>
  ({
    type: 'AUTH/SET-PHOTO',
    photo,
  } as const);
