import React, { ChangeEvent, useState } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';
import { GiCardRandom } from 'react-icons/gi';
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri';
import Popup from 'reactjs-popup';

import { GetUserProfileResponseType } from 'api/types';
import userWithoutPhoto from 'components/common/assets/userWithoutPhoto.png';
import { ToggleButton } from 'components/common/toggleButton/ToggleButton';
import { UniversalButton } from 'components/common/universalButton/UniversalButton';
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
            <UniversalButton
              onClick={() => setEditMode(false)}
              className={styles.userProfileButton}
            >
              quit edit mode
            </UniversalButton>
          ) : (
            <UniversalButton
              onClick={() => setEditMode(true)}
              className={styles.userProfileButton}
            >
              edit profile
            </UniversalButton>
          ))}
        {isProfileOwner && (
          <UniversalButton onClick={showRandomProfile}>
            show random samurai profile
          </UniversalButton>
        )}
        {!isProfileOwner && (
          <UniversalButton className={styles.userProfileButton}>
            Write a message
          </UniversalButton>
        )}

        {!isProfileOwner && (
          <Popup
            trigger={
              <div className={styles.popupTrigger}>
                {followed ? (
                  <UniversalButton style={{ width: '100%' }}>
                    Among your friends <AiFillCaretDown />
                  </UniversalButton>
                ) : (
                  <UniversalButton style={{ width: '100%' }}>
                    Add to friends <AiFillCaretDown />
                  </UniversalButton>
                )}
              </div>
            }
            closeOnDocumentClick
            position="bottom left"
          >
            <div className={styles.userActionsPopup}>
              <ToggleButton
                linkStyled
                labelForFalseValue="follow"
                labelForTrueValue="unfollow"
                currentToggledValue={followed}
                changeValueCallback={handleFollowedStatusChange}
                style={{ marginBottom: '20px' }}
              >
                {followed ? <RiUserUnfollowFill /> : <RiUserFollowFill />}
              </ToggleButton>

              <UniversalButton linkStyled onClick={showRandomProfile}>
                <GiCardRandom /> <span style={{ width: '10px' }} />
                show random samurai profile
              </UniversalButton>
            </div>
          </Popup>
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
