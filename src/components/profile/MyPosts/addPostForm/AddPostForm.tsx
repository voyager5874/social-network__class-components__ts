import { ChangeEvent, FC } from 'react';

import styles from './AddPostForm.module.css';

import { AddPostFormPropsType } from 'components/profile/types';
import { ComponentReturnType } from 'types';

export const AddPostForm: FC<AddPostFormPropsType> = ({
  onSubmit,
  onChange,
  newPostText,
}): ComponentReturnType => {
  const handleAddPost = (): void => {
    onSubmit();
  };
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.currentTarget.value);
  };
  return (
    <div className={styles.addPostForm}>
      <textarea
        placeholder="new post"
        onChange={handleTextareaChange}
        value={newPostText}
      />
      <button type="button" onClick={handleAddPost}>
        add post
      </button>
    </div>
  );
};
