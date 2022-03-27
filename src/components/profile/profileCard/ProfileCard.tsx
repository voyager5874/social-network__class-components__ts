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
    <div className={styles.profileInfoContainer}>
      <div>
        <img
          className={styles.profilePicture}
          src={photos.large ? photos.large : userWithoutPhoto}
          alt="profile"
        />
        <div>{isProfileOwner && <input type="file" onChange={onImageSelect} />}</div>
      </div>
      <div className={styles.profileTextInfo}>
        <h2>
          {fullName}{' '}
          {!isProfileOwner && (
            <ToggleButton
              labelForFalseValue="follow"
              labelForTrueValue="unfollow"
              currentToggledValue={followed}
              changeValueCallback={handleFollowedStatusChange}
            />
          )}
        </h2>
        <UserStatus
          isProfileOwner={isProfileOwner}
          statusText={userStatus}
          updateCurrentUserStatus={updateCurrentUserStatus}
        />

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
        {isProfileOwner && !editMode && (
          <button type="button" onClick={() => setEditMode(true)}>
            edit profile
          </button>
        )}
      </div>
    </div>
  );
};
