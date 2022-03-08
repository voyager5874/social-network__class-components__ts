import {
  InterlocutorType,
  MessageSimpleType,
  MessageType,
} from 'components/dialogs/types';
import { PostType } from 'components/profile/types';
import { rootReducer } from 'store/store';

export type ProfilePageStateType = {
  posts: PostType[];
  newPostText: string;
};

export type PostsStateType = {
  posts: PostType[];
  newPostText: string;
};

export type DialogPageStateType = {
  interlocutors: InterlocutorType[];
  messages: MessageSimpleType[];
  newMessageBody: string;
};

export type InterlocutorsStateType = InterlocutorType[];

export type MessagesStateType = {
  messages: { [personID: string]: MessageType[] };
  newMessageBody: string;
};

export type RootStateType = ReturnType<typeof rootReducer>;
