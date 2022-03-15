import { GetUserProfileResponseType } from 'api/types';
import { MyPosts } from 'components/profile/MyPosts/MyPosts';
import styles from 'components/profile/Profile.module.css';
import { ProfileInfo } from 'components/profile/profileInfo/ProfileInfo';
import { PostType } from 'components/profile/types';
import { ComponentReturnType } from 'types';

type ProfilePropsType = GetUserProfileResponseType & {
  posts: Array<PostType>;
  newPostText: string;
  addPost: () => void;
  updateNewPostText: (text: string) => void;
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
