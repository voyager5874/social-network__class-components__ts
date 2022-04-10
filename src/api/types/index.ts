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

// { captcha required
//   "data": {},
//   "messages": [
//   "Incorrect anti-bot symbols"
// ],
//   "fieldsErrors": [
//   {
//     "field": "captcha",
//     "error": "Incorrect anti-bot symbols"
//   }
// ],
//   "resultCode": 10
// }

// type FieldsErrorType = {
//   field: string;
//   error: string;
// };

// fieldsErrors ? captcha and possibly incorrect profile data fields
// do I need to process these errors ?

// export type AuthMeResponseType = {
//   data: AuthMeResponseDataType;
//   messages: Array<string>;
//   fieldsErrors: FieldsErrorType[];
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

export type dialogsPostPayloadType = {
  body: string;
};

export type MessageOnServerType = {
  id: string;
  body: string;
  translatedBody: Nullable<any>;
  addedAt: string;
  senderId: number;
  senderName: string;
  recipientId: number;
  recipientName: string;
  viewed: boolean;
  deletedBySender: boolean;
  deletedByRecipient: boolean;
  isSpam: boolean;
  distributionId: Nullable<number>;
};

export type MessageOnServerDataType = {
  message: MessageOnServerType;
};

export type GetWithUserDialogResponseType = {
  items: MessageOnServerType[];
  totalCount: Nullable<number>;
  error: Nullable<string>;
};
