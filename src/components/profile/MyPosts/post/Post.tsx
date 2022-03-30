import { FC } from 'react';

import styles from './Post.module.css';

import { PostPropsType } from 'components/profile/types';
import { ComponentReturnType } from 'types';

// export const Post = (): ComponentReturnType => <div>Post</div>;

export const Post: FC<PostPropsType> = ({
  postText,
  likesCount,
  author,
}): ComponentReturnType => (
  <div className={styles.item}>
    <div className={styles.author}>
      <img src={author.avatar} alt="avatar" />
      <div>{author.name}</div>
    </div>

    <div>
      <div>{postText}</div>
      <div>{`likes ${likesCount}`}</div>
    </div>
  </div>
);
