import { EntityStatus } from 'store/reducers/types';
import { Nullable } from 'types';

export type AppReducerStateType = {
  isInitialized: boolean;
  error: Nullable<string>;
  entityStatus: EntityStatus;
};

const initialState: AppReducerStateType = {
  isInitialized: false,
  error: null,
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
    case 'SET-APP-STATUS':
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

export const setAppStatus = (status: EntityStatus) =>
  ({
    type: 'SET-APP-STATUS',
    status,
  } as const);

export type AppReducerActionsType =
  | ReturnType<typeof setAppInitialized>
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppStatus>;
