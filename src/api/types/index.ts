import { ResponseCodes } from 'enums';
import { Nullable } from 'types';

export type UserOnServerType = {
  name: string;
  id: number;
  uniqueUrlName: Nullable<string>;
  photos: {
    small: Nullable<string>;
    large: Nullable<string>;
  };
  status: Nullable<string>;
  followed: boolean;
};

export type GetUsersResponseType = {
  items: UserOnServerType[];
  totalCount: number;
  error: Nullable<string>;
};

export type UserProfileContactsType = {
  facebook: Nullable<string>;
  website: Nullable<string>;
  vk: Nullable<string>;
  twitter: Nullable<string>;
  instagram: Nullable<string>;
  youtube: Nullable<string>;
  github: Nullable<string>;
  mainLink: Nullable<string>;
};

export type UpdateUserProfileRequestDataType = {
  aboutMe: string;
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: UserProfileContactsType;
};

export type GetUserProfileResponseType = {
  aboutMe: Nullable<string>;
  contacts: UserProfileContactsType;
  lookingForAJob: Nullable<boolean>;
  lookingForAJobDescription: Nullable<string>;
  fullName: Nullable<string>;
  userId: Nullable<number>;
  photos: {
    small: Nullable<string>;
    large: Nullable<string>;
  };
};

export type AuthMeResponseDataType = {
  id: Nullable<number>;
  login: Nullable<string>;
  email: Nullable<string>;
};

// fieldsErrors is not really used anywhere so it's possible to just use BasicResponseType
// export type AuthMeResponseType = {
//   data: AuthMeResponseDataType;
//   messages: Array<string>;
//   fieldsErrors: Array<string>;
//   resultCode: ResponseCodes;
// };

// export type FollowUserResponseType = {
//   resultCode: ResponseCodes;
//   messages: Array<string>;
//   data: {};
// };

// export type UnfollowUserResponseType = {
//   resultCode: ResponseCodes;
//   messages: Array<string>;
//   data: {};
// };

export type BasicResponseType<T = {}> = {
  data: T;
  resultCode: ResponseCodes;
  messages: Array<string>;
};

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

export type PutProfilePhotoResponseDataType = {
  photos: {
    small: string;
    large: string;
  };
};

export type GetCaptchaResponseType = {
  url: string;
};
