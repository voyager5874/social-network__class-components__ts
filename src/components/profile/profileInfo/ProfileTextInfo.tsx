import { Link } from 'react-router-dom';

import { UserProfileContactsType } from 'api/types';
import styles from 'components/profile/profileInfo/ProfileTextInfo.module.css';
import { ComponentReturnType, Nullable } from 'types';

type ProfileInfoPropsType = {
  contacts: UserProfileContactsType;
  lookingForAJob: Nullable<boolean>;
  lookingForAJobDescription: Nullable<any>;
  aboutMe: Nullable<any>;
  userId: Nullable<any>;
};

const ProfileTextInfo = ({
  contacts,
  lookingForAJob,
  lookingForAJobDescription,
  aboutMe,
  userId,
}: ProfileInfoPropsType): ComponentReturnType => {
  const socialMediaList = Object.keys(contacts) as Array<keyof typeof contacts>;
  return (
    <div className={styles.profileTextInfo}>
      {/* <h2>{fullName}</h2> */}
      {/* <UserStatus */}
      {/*  isProfileOwner={isProfileOwner} */}
      {/*  statusText={userStatus} */}
      {/*  updateCurrentUserStatus={updateCurrentUserStatus} */}
      {/* /> */}
      <div className={styles.aboutMe}>
        <b>About me:</b>
        {` ${aboutMe || 'no info'}`}
      </div>
      <div>{`ID: ${userId || 'no info'}`}</div>
      <div>
        <b>My social media:</b>
        {socialMediaList.map(media => (
          <div key={media}>
            {contacts[media] && (
              <Link
                target="_blank"
                rel="nofollow noreferer noopener"
                to={`//${contacts[media]!.replace('https://', '')}`}
              >
                {media}
              </Link>
            )}
          </div>
        ))}
      </div>
      <b>My dev dreams</b>
      <div>{`${lookingForAJob ? 'Hire me please' : "I'm not looking for a job"}`}</div>
      <div>
        <b>Expertise:</b>
        {` ${lookingForAJobDescription || 'no info'}`}
      </div>
    </div>
  );
};

export default ProfileTextInfo;
