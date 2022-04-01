import { ChangeEvent, useState } from 'react';

import Floater from 'react-floater';
import { AiFillCaretDown } from 'react-icons/ai';

import { GetUserProfileResponseType } from 'api/types';
import userWithoutPhoto from 'components/common/assets/userWithoutPhoto.png';
import { OrdinaryButton } from 'components/common/ordinaryButton/OrdinaryButton';
import { ToggleButton } from 'components/common/toggleButton/ToggleButton';
import { MyPosts } from 'components/profile/MyPosts/MyPosts';
import styles from 'components/profile/Profile.module.css';
import { ProfileInfoEditForm } from 'components/profile/profileInfo/ProfileInfoEditForm';
import ProfileTextInfo from 'components/profile/profileInfo/ProfileTextInfo';
import { UserStatus } from 'components/profile/profileInfo/UserStatus';
import { PostType } from 'components/profile/types';
import { ComponentReturnType, Nullable } from 'types';

type ProfileCardPropsType = GetUserProfileResponseType & {
  userStatus: Nullable<string>;
  updateCurrentUserStatus: (status: string) => void;
  updateCurrentUserAvatar: (img: File) => void;
  isProfileOwner: boolean;
  followed: Nullable<boolean>;
  changeFollowed: (userID: number, newFollowedState: boolean) => void;
  showRandomProfile: () => void;
  posts: Array<PostType>;
  newPostText: string;
  addPost: () => void;
  updateNewPostText: (text: string) => void;
};

export const Profile = ({
  contacts,
  photos,
  lookingForAJob,
  lookingForAJobDescription,
  aboutMe,
  fullName,
  userId,
  userStatus,
  updateCurrentUserStatus,
  updateCurrentUserAvatar,
  isProfileOwner,
  followed,
  changeFollowed,
  showRandomProfile,
  posts,
  newPostText,
  addPost,
  updateNewPostText,
}: ProfileCardPropsType): ComponentReturnType => {
  // type SocialMediaListType = keyof typeof contacts;
  // const socialMediaList = Object.keys(contacts) as Array<keyof typeof contacts>;
  const [editMode, setEditMode] = useState(false);

  const onImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      updateCurrentUserAvatar(event.target.files[0]);
    }
  };

  const handleFollowedStatusChange = (newStatus: boolean) => {
    if (userId) {
      changeFollowed(userId, newStatus);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageLeft}>
        <img
          className={styles.profilePicture}
          src={photos.large ? photos.large : userWithoutPhoto}
          alt="profile"
        />
        <div>{isProfileOwner && <input type="file" onChange={onImageSelect} />}</div>
        {isProfileOwner &&
          (editMode ? (
            <OrdinaryButton type="button" onClick={() => setEditMode(false)}>
              quit edit mode
            </OrdinaryButton>
          ) : (
            <OrdinaryButton type="button" onClick={() => setEditMode(true)}>
              edit profile
            </OrdinaryButton>
          ))}
        {isProfileOwner && (
          <OrdinaryButton type="button" onClick={showRandomProfile}>
            show random samurai profile
          </OrdinaryButton>
        )}
        {!isProfileOwner && (
          <OrdinaryButton type="button" className={styles.button}>
            Write a message
          </OrdinaryButton>
        )}

        {!isProfileOwner && (
          <Floater
            event="hover"
            eventDelay={1}
            content={
              <div className={styles.userActionsPopup}>
                <ToggleButton
                  labelForFalseValue="follow"
                  labelForTrueValue="unfollow"
                  currentToggledValue={followed}
                  changeValueCallback={handleFollowedStatusChange}
                />
                <OrdinaryButton type="button" onClick={showRandomProfile}>
                  show random samurai profile
                </OrdinaryButton>
              </div>
            }
          >
            <div>
              {followed ? (
                <div className={styles.userActionsCaller}>
                  Among your friends <AiFillCaretDown />
                </div>
              ) : (
                <div className={styles.userActionsCaller}>
                  Add to friends <AiFillCaretDown />
                </div>
              )}
            </div>
          </Floater>
        )}
      </div>
      <div className={styles.pageCenter}>
        <div className={styles.profileInfo}>
          <h3 className={styles.userName}>{fullName}</h3>
          <UserStatus
            isProfileOwner={isProfileOwner}
            statusText={userStatus}
            updateCurrentUserStatus={updateCurrentUserStatus}
          />
          <hr />
          {editMode ? (
            <ProfileInfoEditForm />
          ) : (
            <ProfileTextInfo
              aboutMe={aboutMe}
              contacts={contacts}
              lookingForAJob={lookingForAJob}
              lookingForAJobDescription={lookingForAJobDescription}
              userId={userId}
            />
          )}
        </div>
        <MyPosts
          posts={posts}
          addPost={addPost}
          updateNewPostText={updateNewPostText}
          newPostText={newPostText}
        />
      </div>
    </div>
  );
};
