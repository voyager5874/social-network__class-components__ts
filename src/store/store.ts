import { combineReducers, createStore } from 'redux';

import { interlocutorsReducer } from 'store/reducers/interlocutorsReducer';
import { messagesReducer } from 'store/reducers/messagesReducer';
import { postsReducer } from 'store/reducers/postsReducer';

const appReducers = combineReducers({
  posts: postsReducer,
  interlocutors: interlocutorsReducer,
  messages: messagesReducer,
});

export const store = createStore(appReducers);
