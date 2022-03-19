import { Component, ComponentType } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { GetUserProfileResponseType } from 'api/types';
import { withRouter } from 'components/common';
import { withAuthRedirect } from 'components/common/HOC/withAuthRedirect';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { Profile } from 'components/profile/Profile';
import { PostType } from 'components/profile/types';
import { authCurrentUser } from 'store/middlewares/app';
import {
  getUserProfile,
  getUserStatus,
  updateCurrentUserStatus,
} from 'store/middlewares/userProfile';
import { addPost, updateNewPostText } from 'store/reducers/postsReducer';
import { EntityStatus } from 'store/reducers/types';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

class ProfileContainer extends Component<UserProfilePropsType> {
  componentDidMount(): void {
    if (!this.props.router.params.id && !this.props.loggedInUserID) {
      console.warn("can't make profile and status request: no user id provided");
      return;
    }
    if (this.props.router.params.id) {
      const userID = +this.props.router.params.id;
      this.props.getUserProfile(userID);
      this.props.getUserStatus(userID);
    } else if (this.props.loggedInUserID) {
      const userID = this.props.loggedInUserID;
      this.props.getUserProfile(userID);
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
      />
    );
  }
}

type MapDispatchToPropsType = {
  getUserProfile: (userID: number) => void;
  getUserStatus: (userID: number) => void;
  addPost: () => void;
  updateNewPostText: (text: string) => void;
  updateCurrentUserStatus: (status: string) => void;
};

type MapStateToPropsType = {
  posts: Array<PostType>;
  newPostText: string;
  profile: GetUserProfileResponseType;
  profileEntityStatus: EntityStatus;
  loggedInUserID: Nullable<number>;
  userStatus: Nullable<string>;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  posts: state.posts.posts,
  newPostText: state.posts.newPostText,
  profile: state.userProfile.profileData,
  profileEntityStatus: state.userProfile.entityStatus,
  loggedInUserID: state.authData.id,
  userStatus: state.userProfile.status,
});

type WithRouterPropsType = {
  router: {
    location: {
      pathname: string;
      search: string;
      hash: string;
      state: Nullable<string>;
      key: string;
    };
    params: {
      id: string;
    };
    navigate: (url: string) => void;
  };
};

export type UserProfilePropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  WithRouterPropsType;

export default compose<ComponentType>(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    addPost,
    updateNewPostText,
    authCurrentUser,
    updateCurrentUserStatus,
  }),
)(ProfileContainer);
