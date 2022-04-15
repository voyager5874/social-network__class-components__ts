import { EntityStatus } from 'store/reducers/types';
import { Nullable } from 'types';

type ColorThemesType = 'light' | 'dark';

export type AppReducerStateType = {
  isInitialized: boolean;
  error: Nullable<string>;
  colorTheme: ColorThemesType;
  entityStatus: EntityStatus;
};

const initialState: AppReducerStateType = {
  isInitialized: false,
  error: null,
  colorTheme: 'light',
  entityStatus: EntityStatus.idle,
};

export const appReducer = (
  state: AppReducerStateType = initialState,
  action: AppReducerActionsType,
): AppReducerStateType => {
  switch (action.type) {
    case 'SET-APP-INITIALIZED':
      return { ...state, isInitialized: true };
    case 'SET-APP-ERROR':
      return { ...state, error: action.error };
    case 'SET-APP-ENTITY-STATUS':
      return { ...state, entityStatus: action.status };
    default:
      return state;
  }
};

export const setAppInitialized = () =>
  ({
    type: 'SET-APP-INITIALIZED',
  } as const);

export const setAppError = (error: string) =>
  ({
    type: 'SET-APP-ERROR',
    error,
  } as const);

export const setAppEntityStatus = (status: EntityStatus) =>
  ({
    type: 'SET-APP-ENTITY-STATUS',
    status,
  } as const);

export const setAppColorTheme = (theme: ColorThemesType) =>
  ({
    type: 'APP/SET-COLOR-THEME',
    theme,
  } as const);

export type AppReducerActionsType =
  | ReturnType<typeof setAppInitialized>
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppColorTheme>
  | ReturnType<typeof setAppEntityStatus>;
