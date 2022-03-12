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
