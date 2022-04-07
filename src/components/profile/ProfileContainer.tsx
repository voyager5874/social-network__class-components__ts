import { Component, ComponentType } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { GetUserProfileResponseType } from 'api/types';
import { withRouter } from 'components/common';
import { WithRouterPropsType } from 'components/common/HOC/types';
import { withAuthRedirect } from 'components/common/HOC/withAuthRedirect';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { Profile } from 'components/profile/Profile';
import { PostType } from 'components/profile/types';
import { initializeApp } from 'store/middlewares/app';
import {
  findRealSamurai,
  getProfile,
  getUserStatus,
  updateCurrentUserAvatar,
  updateCurrentUserStatus,
} from 'store/middlewares/userProfile';
import { changeFollowedByCurrentUserState } from 'store/middlewares/users';
import { addPost, updateNewPostText } from 'store/reducers/postsReducer';
import { EntityStatus } from 'store/reducers/types';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

class ProfileContainer extends Component<UserProfilePropsType> {
  componentDidMount(): void {
    this.collectProfilePageData();
  }

  componentDidUpdate(prevProps: UserProfilePropsType) {
    if (prevProps.router.params.id === this.props.router.params.id) return;
    this.collectProfilePageData();
  }

  showRandomProfile = async (): Promise<void> => {
    // this.props.findRealSamurai(this.props.router.navigate);
    try {
      const response = await this.props.findRealSamurai();
      this.props.router.navigate(`/profile/${response}`);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`${error}`);
    }
  };

  collectProfilePageData(): void {
    if (!this.props.router.params.id && !this.props.loggedInUserID) {
      console.warn("can't make profile and status request: no user id provided");
      return;
    }
    if (this.props.router.params.id) {
      const userID = +this.props.router.params.id;
      this.props.getProfile(userID);
      this.props.getUserStatus(userID);
    } else if (this.props.loggedInUserID) {
      const userID = this.props.loggedInUserID;
      this.props.getProfile(userID);
      this.props.getUserStatus(userID);
    }
  }

  render(): ComponentReturnType {
    const {
      contacts,
      lookingForAJobDescription,
      lookingForAJob,
      photos,
      aboutMe,
      fullName,
      userId,
    } = this.props.profile;
    return this.props.profileEntityStatus === EntityStatus.busy ||
      // !this.props.loggedInUserID ||
      !userId ? (
      <LoadingVisualizer />
    ) : (
      <Profile
        contacts={contacts}
        followed={this.props.followed}
        changeFollowed={this.props.changeFollowedByCurrentUserState}
        userId={userId}
        fullName={fullName}
        lookingForAJobDescription={lookingForAJobDescription}
        aboutMe={aboutMe}
        lookingForAJob={lookingForAJob}
        photos={photos}
        posts={this.props.posts}
        newPostText={this.props.newPostText}
        addPost={this.props.addPost}
        updateNewPostText={this.props.updateNewPostText}
        userStatus={this.props.userStatus}
        updateCurrentUserStatus={this.props.updateCurrentUserStatus}
        updateCurrentUserAvatar={this.props.updateCurrentUserAvatar}
        isProfileOwner={this.props.profile.userId === this.props.loggedInUserID}
        showRandomProfile={this.showRandomProfile}
      />
    );
  }
}

type MapDispatchToPropsType = {
  // getUserProfile: (userID: number) => void;
  getProfile: typeof getProfile;
  changeFollowedByCurrentUserState: typeof changeFollowedByCurrentUserState;
  getUserStatus: typeof getUserStatus;
  addPost: typeof addPost;
  updateNewPostText: typeof updateNewPostText;
  // updateCurrentUserStatus: (status: string) => void;
  updateCurrentUserStatus: typeof updateCurrentUserStatus;
  // updateCurrentUserAvatar: (image: File) => void;
  updateCurrentUserAvatar: typeof updateCurrentUserAvatar;
  // findRealSamurai: () => any;
  findRealSamurai: typeof findRealSamurai;
  // findRealSamurai: () => () => Promise<number>;
};

type MapStateToPropsType = {
  posts: Array<PostType>;
  newPostText: string;
  profile: GetUserProfileResponseType;
  profileEntityStatus: EntityStatus;
  loggedInUserID: Nullable<number>;
  userStatus: Nullable<string>;
  followed: Nullable<boolean>;
  // usersCount: number;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  posts: state.posts.posts,
  newPostText: state.posts.newPostText,
  profile: state.userProfile.profileData,
  profileEntityStatus: state.userProfile.entityStatus,
  loggedInUserID: state.authData.id,
  userStatus: state.userProfile.status,
  followed: state.userProfile.followed,
  // usersCount: state.users.totalCount,
});

export type UserProfilePropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  WithRouterPropsType;

export default compose<ComponentType>(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getProfile,
    getUserStatus,
    addPost,
    updateNewPostText,
    authCurrentUser: initializeApp,
    updateCurrentUserStatus,
    updateCurrentUserAvatar,
    findRealSamurai,
    changeFollowedByCurrentUserState,
  }),
)(ProfileContainer);
