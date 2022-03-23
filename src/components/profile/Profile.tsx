import { GetUserProfileResponseType } from 'api/types';
import { MyPosts } from 'components/profile/MyPosts/MyPosts';
import styles from 'components/profile/Profile.module.css';
import { ProfileInfo } from 'components/profile/profileInfo/ProfileInfo';
import { PostType } from 'components/profile/types';
import { ComponentReturnType, Nullable } from 'types';

type ProfilePropsType = GetUserProfileResponseType & {
  posts: Array<PostType>;
  newPostText: string;
  addPost: () => void;
  updateNewPostText: (text: string) => void;
  userStatus: Nullable<string>;
  updateCurrentUserStatus: (status: string) => void;
  updateCurrentUserAvatar: (image: File) => void;
  showAvatarButton: boolean;
};

export const Profile = ({
  contacts,
  photos,
  fullName,
  lookingForAJobDescription,
  aboutMe,
  lookingForAJob,
  userId,
  posts,
  newPostText,
  addPost,
  updateNewPostText,
  userStatus,
  updateCurrentUserStatus,
  updateCurrentUserAvatar,
  showAvatarButton,
}: ProfilePropsType): ComponentReturnType => {
  const someContent = 'Profile';
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
        userStatus={userStatus}
        updateCurrentUserStatus={updateCurrentUserStatus}
        updateCurrentUserAvatar={updateCurrentUserAvatar}
        showAvatarButton={showAvatarButton}
      />
      <MyPosts
        posts={posts}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
        newPostText={newPostText}
      />
      <div>{someContent}</div>
    </div>
  );
};
