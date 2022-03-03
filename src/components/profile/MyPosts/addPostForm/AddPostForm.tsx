import { FC } from 'react';

import styles from './AddPostForm.module.css';

import { AddPostFormPropsType } from 'components/profile/types';
import { ComponentReturnType } from 'types';

export const AddPostForm: FC<AddPostFormPropsType> = ({
  onSubmit,
}): ComponentReturnType => {
  const handleAddPost = (): void => {
    onSubmit('new post');
  };
  return (
    <div className={styles.addPostForm}>
      <textarea placeholder="new post" />
      <button type="button" onClick={handleAddPost}>
        add post
      </button>
    </div>
  );
};
