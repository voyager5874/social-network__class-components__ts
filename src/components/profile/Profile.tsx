import { GetUserProfileResponseType } from 'api/types';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { MyPosts } from 'components/profile/MyPosts/MyPosts';
import styles from 'components/profile/Profile.module.css';
import { ProfileInfo } from 'components/profile/profileInfo/ProfileInfo';
import { postsElements } from 'store/stubData';
import { ComponentReturnType } from 'types';

type ProfilePropsType = GetUserProfileResponseType;

export const Profile = ({
  contacts,
  photos,
  fullName,
  lookingForAJobDescription,
  aboutMe,
  lookingForAJob,
  userId,
}: ProfilePropsType): ComponentReturnType => {
  const someContent = 'Profile';
  const someFunc = (): void => {};
  return (
    <div className={styles.profile}>
      <ProfileInfo
        aboutMe={aboutMe}
        photos={photos}
        contacts={contacts}
        fullName={fullName}
        lookingForAJob={lookingForAJob}
        lookingForAJobDescription={lookingForAJobDescription}
        userId={userId}
      />
      <MyPosts posts={postsElements} addPost={someFunc} />
      <div>{someContent}</div>
    </div>
  );
};
