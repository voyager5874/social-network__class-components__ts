import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

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

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store; // for testing and developing
