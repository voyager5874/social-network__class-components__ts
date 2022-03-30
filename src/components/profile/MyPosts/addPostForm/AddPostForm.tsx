import { ChangeEvent, FC, KeyboardEvent } from 'react';

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

  const handleEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter') {
      handleAddPost();
    }
  };
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.currentTarget.value);
  };
  return (
    <div className={styles.addPostForm}>
      <textarea
        className={styles.newPostTextArea}
        placeholder="Nulla dies sine linea"
        onChange={handleTextareaChange}
        value={newPostText}
        onKeyPress={handleEnterPress}
      />
      <button type="button" onClick={handleAddPost}>
        add post
      </button>
    </div>
  );
};
