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

export type getUsersResponseType = {
  items: UserOnServerType[];
  totalCount: number;
  error: Nullable<string>;
};
