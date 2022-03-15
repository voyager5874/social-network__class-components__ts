import { FC } from 'react';

import styles from './MyPosts.module.css';

import { AddPostForm } from 'components/profile/MyPosts/addPostForm/AddPostForm';
import { Post } from 'components/profile/MyPosts/post/Post';
import { MyPostsPropsType } from 'components/profile/types';
import { ComponentReturnType } from 'types';

// const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
export const MyPosts: FC<MyPostsPropsType> = ({
  posts,
  addPost,
  updateNewPostText,
  newPostText,
}): ComponentReturnType => {
  const content = posts
    .reverse()
    .map(({ id, postText, likesCount }) => (
      <Post key={id} postText={postText} likesCount={likesCount} id={id} />
    ));

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <AddPostForm
        onSubmit={addPost}
        onChange={updateNewPostText}
        newPostText={newPostText}
      />
      <div className={styles.posts}>{content}</div>
    </div>
  );
};
