import { ChangeEvent, useState } from 'react';

import styles from './ProfileCard.module.css';

import { GetUserProfileResponseType } from 'api/types';
import userWithoutPhoto from 'components/common/assets/userWithoutPhoto.png';
import { ToggleButton } from 'components/common/toggleButton/ToggleButton';
import ProfileInfo from 'components/profile/profileCard/ProfileInfo';
import { ProfileInfoEditForm } from 'components/profile/profileCard/ProfileInfoEditForm';
import { UserStatus } from 'components/profile/profileCard/UserStatus';
import { ComponentReturnType, Nullable } from 'types';

type ProfileCardPropsType = GetUserProfileResponseType & {
  userStatus: Nullable<string>;
  updateCurrentUserStatus: (status: string) => void;
  updateCurrentUserAvatar: (img: File) => void;
  isProfileOwner: boolean;
  followed: Nullable<boolean>;
  changeFollowed: (userID: number, newFollowedState: boolean) => void;
  showRandomProfile: () => void;
};

export const ProfileCard = ({
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
}: ProfileCardPropsType): ComponentReturnType => {
  // type SocialMediaListType = keyof typeof contacts;
  // const socialMediaList = Object.keys(contacts) as Array<keyof typeof contacts>;
  const [editMode, setEditMode] = useState(false);
  const [showUserActionsPopup, setShowUserActionsPopup] = useState(false);

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

  const handleShowOptions = () => {
    setShowUserActionsPopup(!showUserActionsPopup);
  };
  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.profilePictureContainer}>
        <img
          className={styles.profilePicture}
          src={photos.large ? photos.large : userWithoutPhoto}
          alt="profile"
        />
        <div>{isProfileOwner && <input type="file" onChange={onImageSelect} />}</div>
        {isProfileOwner && !editMode && (
          <button
            className={styles.button}
            type="button"
            onClick={() => setEditMode(true)}
          >
            edit profile
          </button>
        )}
        {!isProfileOwner && (
          <button type="button" className={styles.button}>
            Write a message
          </button>
        )}
        {followed && (
          <div onMouseEnter={handleShowOptions} onMouseLeave={handleShowOptions}>
            Among your friends
            {showUserActionsPopup && (
              <div onBlur={handleShowOptions} className={styles.userActionsPopup}>
                {!isProfileOwner && (
                  <ToggleButton
                    labelForFalseValue="follow"
                    labelForTrueValue="unfollow"
                    currentToggledValue={followed}
                    changeValueCallback={handleFollowedStatusChange}
                  />
                )}
                <button type="button" onClick={showRandomProfile}>
                  show random samurai profile
                </button>
              </div>
            )}
          </div>
        )}
        {!isProfileOwner && !followed && (
          <div onMouseEnter={handleShowOptions} onMouseLeave={handleShowOptions}>
            Add to friends
            {showUserActionsPopup && (
              <div onBlur={handleShowOptions} className={styles.userActionsPopup}>
                {!isProfileOwner && (
                  <ToggleButton
                    labelForFalseValue="follow"
                    labelForTrueValue="unfollow"
                    currentToggledValue={followed}
                    changeValueCallback={handleFollowedStatusChange}
                  />
                )}
                <button type="button" onClick={showRandomProfile}>
                  show random samurai profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.profileTextInfo}>
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
          <ProfileInfo
            aboutMe={aboutMe}
            contacts={contacts}
            lookingForAJob={lookingForAJob}
            lookingForAJobDescription={lookingForAJobDescription}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
};
