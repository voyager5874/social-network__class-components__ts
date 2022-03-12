import { GetUserProfileResponseType, UserOnServerType } from 'api/types';
import {
  InterlocutorType,
  MessageSimpleType,
  MessageType,
} from 'components/dialogs/types';
import { PostType } from 'components/profile/types';
import { Nullable } from 'types';

export type InterlocutorsStateType = InterlocutorType[];

export type MessagesStateType = {
  messages: { [personID: string]: MessageType[] };
  newMessageBody: string;
};

export type usersReducerStateType = {
  users: UserOnServerType[];
  totalCount: number;
  currentPage: number;
  isFetching: boolean;
};

// export type UserProfileReducerStateType = {
//   aboutMe: Nullable<string>;
//   contacts: {
//     facebook: Nullable<string>;
//     website: Nullable<string>;
//     vk: Nullable<string>;
//     twitter: Nullable<string>;
//     instagram: Nullable<string>;
//     youtube: Nullable<string>;
//     github: Nullable<string>;
//     mainLink: Nullable<string>;
//   };
//   lookingForAJob: Nullable<string>;
//   lookingForAJobDescription: Nullable<string>;
//   fullName: string;
//   userId: number;
//   photos: {
//     small: Nullable<string>;
//     large: Nullable<string>;
//   };
// };
export type UserProfileReducerStateType = GetUserProfileResponseType;

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
