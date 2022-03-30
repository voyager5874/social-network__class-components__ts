import { GetUserProfileResponseType } from 'api/types';
import { MyPosts } from 'components/profile/MyPosts/MyPosts';
import styles from 'components/profile/Profile.module.css';
import { ProfileCard } from 'components/profile/profileCard/ProfileCard';
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
  isProfileOwner: boolean;
  showRandomProfile: () => void;
  followed: Nullable<boolean>;
  changeFollowed: (userID: number, newFollowedState: boolean) => void;
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
  isProfileOwner,
  showRandomProfile,
  followed,
  changeFollowed,
}: ProfilePropsType): ComponentReturnType => {
  const someContent = 'Profile';
  return (
    <div className={styles.profile}>
      <ProfileCard
        changeFollowed={changeFollowed}
        followed={followed}
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
        isProfileOwner={isProfileOwner}
        showRandomProfile={showRandomProfile}
      />
      {/* <button type="button" onClick={showRandomProfile}> */}
      {/*  showRandomProfile */}
      {/* </button> */}
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
