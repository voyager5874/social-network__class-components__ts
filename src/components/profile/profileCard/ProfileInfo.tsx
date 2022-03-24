import { UserProfileContactsType } from 'api/types';
import styles from 'components/profile/profileCard/ProfileCard.module.css';
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
      <div>{`About me: ${aboutMe || 'no info'}`}</div>
      <div>{`ID: ${userId || 'no info'}`}</div>
      <div>
        {socialMediaList.map(media => (
          <div key={media}>
            {contacts[media] && <a href={`//${contacts[media]}`}>{media}</a>}
          </div>
        ))}
      </div>
      <div>{`Looking for a dev job - ${lookingForAJob ? 'Hire me please' : 'No'}`}</div>
      <div>{`Desired position - ${lookingForAJobDescription || 'no info'}`}</div>
    </div>
  );
};

export default ProfileInfo;
