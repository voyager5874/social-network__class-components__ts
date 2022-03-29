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

  showRandomProfile = () => {
    this.props.findRealSamurai(this.props.router.navigate);
    //   this.props
    //     .findRealSamurai(this.props.router.navigate)
    //     .then(response => this.props.router.navigate(`/profile/${response}`));
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
  getProfile: (userID: number) => void;
  changeFollowedByCurrentUserState: (userID: number, newFollowedState: boolean) => void;
  getUserStatus: (userID: number) => void;
  addPost: () => void;
  updateNewPostText: (text: string) => void;
  updateCurrentUserStatus: (status: string) => void;
  updateCurrentUserAvatar: (image: File) => void;
  findRealSamurai: (navigate: any) => any;
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
