import { combineReducers, createStore } from 'redux';

import { authReducer } from 'store/reducers/authReducer';
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
});

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store; // for testing and developing
