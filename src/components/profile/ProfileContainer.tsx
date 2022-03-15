import { Component, ComponentType } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { GetUserProfileResponseType } from 'api/types';
import { withRouter } from 'components/common';
import { withAuthRedirect } from 'components/common/HOC/withAuthRedirect';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { Profile } from 'components/profile/Profile';
import { PostType } from 'components/profile/types';
import { DIMYCH_ID } from 'constants/base';
import { authCurrentUser } from 'store/middlewares/app';
import { getUserProfile } from 'store/middlewares/userProfile';
import { addPost, updateNewPostText } from 'store/reducers/postsReducer';
import { EntityStatus } from 'store/reducers/types';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

class ProfileContainer extends Component<UserProfilePropsType> {
  componentDidMount(): void {
    debugger;
    let userID = +this.props.router.params.id || 0;
    if (!userID) {
      userID = this.props.loggedInUserID || DIMYCH_ID;
    }
    this.props.getUserProfile(userID);
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
      // eslint-disable-next-line react/destructuring-assignment
    } = this.props.profile;
    return this.props.profileEntityStatus === EntityStatus.busy ||
      this.props.loggedInUserID === null ? (
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
      />
    );
  }
}

type MapDispatchToPropsType = {
  getUserProfile: (userID: number) => void;
  addPost: () => void;
  updateNewPostText: (text: string) => void;
};

type MapStateToPropsType = {
  posts: Array<PostType>;
  newPostText: string;
  profile: GetUserProfileResponseType;
  profileEntityStatus: EntityStatus;
  loggedInUserID: Nullable<number>;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  posts: state.posts.posts,
  newPostText: state.posts.newPostText,
  profile: state.userProfile.profileData,
  profileEntityStatus: state.userProfile.entityStatus,
  loggedInUserID: state.authData.id,
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

// type WithParamsPropsType = {
//   params: {
//     id: string;
//   };
// };

export type UserProfilePropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  WithRouterPropsType;

// const WithRouterWrapper = withRouter(ProfileContainer);

// export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWrapper);

// export default withAuthRedirect(
//   connect(mapStateToProps, {
//     getUserProfile,
//     addPost,
//     updateNewPostText,
//     authCurrentUser,
//   })(WithRouterWrapper),
// );

export default compose<ComponentType>(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getUserProfile,
    addPost,
    updateNewPostText,
    authCurrentUser,
  }),
)(ProfileContainer);
