import { Link } from 'react-router-dom';

import styles from './ProfileInfo.module.css';

import { UserProfileContactsType } from 'api/types';
import { Nullable } from 'types';

type ProfileInfoPropsType = {
  contacts: UserProfileContactsType;
  lookingForAJob: Nullable<boolean>;
  lookingForAJobDescription: Nullable<any>;
  aboutMe: Nullable<any>;
  userId: Nullable<any>;
};

const ProfileInfo = ({
  contacts,
  lookingForAJob,
  lookingForAJobDescription,
  aboutMe,
  userId,
}: ProfileInfoPropsType) => {
  const socialMediaList = Object.keys(contacts) as Array<keyof typeof contacts>;

  return (
    <div className={styles.profileTextInfo}>
      {/* <h2>{fullName}</h2> */}
      {/* <UserStatus */}
      {/*  isProfileOwner={isProfileOwner} */}
      {/*  statusText={userStatus} */}
      {/*  updateCurrentUserStatus={updateCurrentUserStatus} */}
      {/* /> */}
      <div>
        <b>About me:</b>
        {` ${aboutMe || 'no info'}`}
      </div>
      <div>{`ID: ${userId || 'no info'}`}</div>
      <div>
        <b>My social media:</b>
        {socialMediaList.map(media => (
          <div key={media}>
            {contacts[media] && (
              <Link target="_blank" to={`//${contacts[media]!.replace('https://', '')}`}>
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

export default ProfileInfo;
