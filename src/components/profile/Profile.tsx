import { MyPosts } from 'components/profile/MyPosts/MyPosts';
import styles from 'components/profile/Profile.module.css';
import { ProfileInfo } from 'components/profile/profileInfo/ProfileInfo';
import { postsElements } from 'store/stubData';
import { ComponentReturnType } from 'types';

export const Profile = (): ComponentReturnType => {
  const someContent = 'Profile';
  const someFunc = (): void => {};
  return (
    <div className={styles.profile}>
      <ProfileInfo />
      <MyPosts posts={postsElements} addPost={someFunc} />
      <div>{someContent}</div>
    </div>
  );
};
