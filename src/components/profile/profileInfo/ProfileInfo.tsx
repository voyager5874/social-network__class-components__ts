import { v1 } from 'uuid';

import styles from './ProfileInfo.module.css';

import { GetUserProfileResponseType } from 'api/types';
import userWithoutPhoto from 'components/common/assets/userWithoutPhoto.png';
import { UserStatus } from 'components/profile/profileInfo/UserStatus';
import { ComponentReturnType, Nullable } from 'types';

type ProfileInfoPropsType = GetUserProfileResponseType & { userStatus: Nullable<string> };

export const ProfileInfo = ({
  contacts,
  photos,
  lookingForAJob,
  lookingForAJobDescription,
  aboutMe,
  fullName,
  userId,
  userStatus,
}: ProfileInfoPropsType): ComponentReturnType => {
  // type SocialMediaListType = keyof typeof contacts;
  const socialMediaList = Object.keys(contacts) as Array<keyof typeof contacts>;
  return (
    <div className={styles.profileInfoContainer}>
      <div>
        <img
          className={styles.profilePicture}
          src={photos.large ? photos.large : userWithoutPhoto}
          alt="profile"
        />
      </div>
      <div className={styles.profileTextInfo}>
        <h2>{fullName}</h2>
        <UserStatus statusText={userStatus} />
        <div>
          {socialMediaList.map(media => (
            <div key={v1()}>
              {contacts[media] && <a href={`${contacts[media]}`}>{media}</a>}
            </div>
          ))}
        </div>
        <div>{`About me: ${aboutMe || 'no info'}`}</div>
        <div>{`Looking for a dev job - ${lookingForAJob ? 'Hire me please' : 'No'}`}</div>
        <div>{`Desired position - ${lookingForAJobDescription || 'no info'}`}</div>
        <div>{`ID: ${userId || 'no info'}`}</div>
      </div>
    </div>
  );
};
