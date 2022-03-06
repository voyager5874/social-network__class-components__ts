import { v1 } from 'uuid';

import { PostType } from 'components/profile/types';
import { PostsStateType } from 'store/types';

const initialState: PostsStateType = {
  posts: [
    { id: v1(), postText: 'Hi, how are you?', likesCount: 12 },
    { id: v1(), postText: "It's my first post", likesCount: 11 },
    { id: v1(), postText: 'Blabla', likesCount: 11 },
    { id: v1(), postText: 'Dada', likesCount: 11 },
  ],
  newPostText: 'it-kamasutra.com',
};

export const postsReducer = (
  state: PostsStateType = initialState,
  action: postsReducerActionsType,
): PostsStateType => {
  switch (action.type) {
    case 'ADD-POST': {
      const newPost: PostType = { id: v1(), postText: state.newPostText, likesCount: 0 };
      const stateCopy = { ...state, posts: [...state.posts] };
      stateCopy.posts.unshift(newPost);
      return stateCopy;
    }

    case 'UPDATE-NEW-POST-TEXT':
      return { ...state, newPostText: action.content };
    default:
      return state;
  }
};

export type postsReducerActionsType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>;
export const addPostAC = () =>
  ({
    type: 'ADD-POST',
  } as const);

export const updateNewPostTextAC = (content: string) =>
  ({
    type: 'UPDATE-NEW-POST-TEXT',
    content,
  } as const);
