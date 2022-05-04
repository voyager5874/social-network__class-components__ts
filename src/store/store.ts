import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { appReducer } from 'store/reducers/app';
import { authReducer } from 'store/reducers/authReducer';
import { friendsReducer } from 'store/reducers/friends';
import { interlocutorsReducer } from 'store/reducers/interlocutorsReducer';
import { messagesReducer } from 'store/reducers/messagesReducer';
import { postsReducer } from 'store/reducers/postsReducer';
import { userProfileReducer } from 'store/reducers/userProfileReducer';
import { usersReducer } from 'store/reducers/usersReducer';

export const rootReducer = combineReducers({
  posts: postsReducer,
  interlocutors: interlocutorsReducer,
  messages: messagesReducer,
  users: usersReducer,
  userProfile: userProfileReducer,
  authData: authReducer,
  app: appReducer,
  friends: friendsReducer,
});

// const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export type DispatchType = ThunkDispatch<ReturnType<typeof rootReducer>, any, any>;
// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)),
// );

// export type AppDispatch = typeof store.dispatch
