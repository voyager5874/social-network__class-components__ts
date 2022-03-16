import {
  AuthMeResponseDataType,
  GetUserProfileResponseType,
  UserOnServerType,
} from 'api/types';
import {
  InterlocutorType,
  MessageSimpleType,
  MessageType,
} from 'components/dialogs/types';
import { PostType } from 'components/profile/types';
import { Nullable } from 'types';

export enum EntityStatus {
  idle,
  initialization,
  busy,
}

export type InterlocutorsStateType = InterlocutorType[];

export type MessagesStateType = {
  messages: { [personID: string]: MessageType[] };
  newMessageBody: string;
};

export type UserInAppType = UserOnServerType & { entityStatus: EntityStatus };

export type UsersReducerStateType = {
  users: UserInAppType[];
  totalCount: number;
  currentPage: number;
  isFetching: boolean;
  busyEntities: Array<number>;
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
export type UserProfileReducerStateType = {
  profileData: GetUserProfileResponseType;
  entityStatus: EntityStatus;
  status: Nullable<string>;
};

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

export type AuthReducerStateType = AuthMeResponseDataType & { isLoggedIn: boolean };
