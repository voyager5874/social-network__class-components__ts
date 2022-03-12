import { UserProfileContactsType } from 'api/types';

export type PostPropsType = {
  message: string;
  likesCount: number;
};
export type PostType = {
  id: string;
  postText: string;
  likesCount: number;
};

export type MapPropsType = {
  posts: Array<PostType>;
  addPost: (postText: string) => void;
};

export type MyPostsPropsType = {
  posts: Array<PostType>;
  addPost: () => void;
};

export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};

export type AddPostFormValuesType = {
  newPostText: string;
};
export type AddPostFormPropsType = {
  onSubmit: Function;
};

// export type SocialMediaListType = keyof typeof state.profileData.contacts;

