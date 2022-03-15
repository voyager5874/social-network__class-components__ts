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
  addPost: () => void;
};

export type MyPostsPropsType = {
  posts: Array<PostType>;
  addPost: () => void;
  updateNewPostText: (text: string) => void;
  newPostText: string;
};

export type DispatchPropsType = {
  addPost: () => void;
};

export type AddPostFormValuesType = {
  newPostText: string;
};
export type AddPostFormPropsType = {
  onSubmit: () => void;
  onChange: (text: string) => void;
  newPostText: string;
};

// export type SocialMediaListType = keyof typeof state.profileData.contacts;
