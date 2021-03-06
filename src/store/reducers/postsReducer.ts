import { loremIpsum } from 'react-lorem-ipsum';
import { v1 } from 'uuid';

import { PostType } from 'components/profile/types';
import { PostsStateType } from 'store/reducers/types';

const initialState: PostsStateType = {
  posts: [
    { id: v1(), postText: loremIpsum({ random: true })[0], likesCount: 12 },
    { id: v1(), postText: loremIpsum({ random: true })[0], likesCount: 11 },
    { id: v1(), postText: loremIpsum({ random: true })[0], likesCount: 11 },
    { id: v1(), postText: loremIpsum({ random: true })[0], likesCount: 11 },
  ],
  newPostText: '',
};

export const postsReducer = (
  state: PostsStateType = initialState,
  action: postsReducerActionsType,
): PostsStateType => {
  switch (action.type) {
    case 'ADD-POST': {
      const newPost: PostType = { id: v1(), postText: state.newPostText, likesCount: 0 };
      const stateCopy = {
        ...state,
        posts: [...state.posts],
        newPostText: '',
      };
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
  | ReturnType<typeof addPost>
  | ReturnType<typeof updateNewPostText>;

export const addPost = () =>
  ({
    type: 'ADD-POST',
  } as const);

export const updateNewPostText = (content: string) =>
  ({
    type: 'UPDATE-NEW-POST-TEXT',
    content,
  } as const);
