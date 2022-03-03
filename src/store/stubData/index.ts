import { v1 } from 'uuid';

import { STRING_STUB } from 'constants/base';
import { getRandomInteger } from 'utils';

export const MAX_LIKES_COUNT = 100;
export const postsElements = [
  { id: v1(), postText: STRING_STUB, likesCount: getRandomInteger(MAX_LIKES_COUNT) },
  { id: v1(), postText: STRING_STUB, likesCount: getRandomInteger(MAX_LIKES_COUNT) },
  { id: v1(), postText: STRING_STUB, likesCount: getRandomInteger(MAX_LIKES_COUNT) },
  { id: v1(), postText: STRING_STUB, likesCount: getRandomInteger(MAX_LIKES_COUNT) },
  { id: v1(), postText: STRING_STUB, likesCount: getRandomInteger(MAX_LIKES_COUNT) },
  { id: v1(), postText: STRING_STUB, likesCount: getRandomInteger(MAX_LIKES_COUNT) },
];

export const dialogsData = [
  { id: v1(), name: 'Monika' },
  { id: v1(), name: 'Ross' },
  { id: v1(), name: 'Rachel' },
  { id: v1(), name: 'Chandler' },
  { id: v1(), name: 'Phoebe' },
];

export const messagesData = [
  { id: v1(), message: STRING_STUB },
  { id: v1(), message: STRING_STUB },
  { id: v1(), message: STRING_STUB },
  { id: v1(), message: STRING_STUB },
  { id: v1(), message: STRING_STUB },
];
