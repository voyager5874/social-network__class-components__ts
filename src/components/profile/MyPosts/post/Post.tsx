import { FC } from 'react';

import styles from './Post.module.css';

import { PostType } from 'components/profile/types';
import { ComponentReturnType } from 'types';

// export const Post = (): ComponentReturnType => <div>Post</div>;

export const Post: FC<PostType> = ({ postText, likesCount }): ComponentReturnType => (
  <div className={styles.item}>
    <img
      src="https://image.shutterstock.com/image-vector/user-avatar-icon-sign-profile-260nw-1145752283.jpg"
      alt="avatar"
    />
    {postText}
    <div>
      <span>like</span> {likesCount}
    </div>
  </div>
);
