import { ThunkAction } from 'redux-thunk';

import { AppReducerActionsType } from 'store/reducers/app';
import { AuthReducerActionsType } from 'store/reducers/authReducer';
import { FriendsReducerActionsType } from 'store/reducers/friends';
import { postsReducerActionsType } from 'store/reducers/postsReducer';
import { UserProfileReducerActionsType } from 'store/reducers/userProfileReducer';
import { usersReducerActionsType } from 'store/reducers/usersReducer';
import { rootReducer } from 'store/store';

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppActionsType =
  | usersReducerActionsType
  | FriendsReducerActionsType
  | postsReducerActionsType
  | AuthReducerActionsType
  | AppReducerActionsType
  | UserProfileReducerActionsType;

export type ThunkType = ThunkAction<void, RootStateType, unknown, AppActionsType>;
