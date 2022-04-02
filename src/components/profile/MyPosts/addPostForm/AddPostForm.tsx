import { ChangeEvent, FC, KeyboardEvent } from 'react';

import { AiFillCamera, AiFillVideoCamera } from 'react-icons/ai';
import {
  BsFillFileEarmarkMusicFill,
  BsFillFileEarmarkRichtextFill,
} from 'react-icons/bs';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './AddPostForm.module.css';

import userWithoutPic from 'components/common/assets/userWithoutPhoto.png';
import { UniversalButton } from 'components/common/universalButton/UniversalButton';
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
      <div className={styles.textareaContainer}>
        <img src={userWithoutPic} alt="author-avatar" className={styles.authorPicture} />
        <TextareaAutosize
          className={styles.newPostTextArea}
          placeholder="Nulla dies sine linea"
          onChange={handleTextareaChange}
          value={newPostText}
          onKeyPress={handleEnterPress}
        />
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.compositionControls}>
          <AiFillCamera className={styles.attachmentTypeIcon} />
          <AiFillVideoCamera className={styles.attachmentTypeIcon} />
          <BsFillFileEarmarkMusicFill className={styles.attachmentTypeIcon} />
          <BsFillFileEarmarkRichtextFill className={styles.attachmentTypeIcon} />
        </div>

        <UniversalButton onClick={handleAddPost}>Publish</UniversalButton>
      </div>
    </div>
  );
};
