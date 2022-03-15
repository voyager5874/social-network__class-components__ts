import { Component } from 'react';

import { connect } from 'react-redux';

import { GetUserProfileResponseType } from 'api/types';
import { withRouter } from 'components/common';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { Profile } from 'components/profile/Profile';
import { PostType } from 'components/profile/types';
import { getUserProfile } from 'store/middlewares/userProfile';
import { EntityStatus } from 'store/reducers/types';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';
import { addPost, updateNewPostText } from 'store/reducers/postsReducer';

class ProfileContainer extends Component<UserProfilePropsType> {
  componentDidMount(): void {
    // eslint-disable-next-line react/destructuring-assignment
    let userID = +this.props.router.params.id;
    if (!userID) {
      userID = 21647; // check nested routes
      // eslint-disable-next-line react/destructuring-assignment
      this.props.router.navigate(`/profile/${userID}`);
    }
    this.props.getUserProfile(userID);
  }

  // checkIfUserFollowed = (userID: number): boolean => {
  //   usersAPI.checkIfUserFollowed(userID).then(response => {
  //     if (response.data) {
  //       this.props.setUserIsFollowed(true);
  //     } else {
  //       this.props.setUserIsFollowed(false);
  //     }
  //   });
  // };

  render(): ComponentReturnType {
    debugger;

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
    return this.props.profileEntityStatus === EntityStatus.busy ? (
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
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  posts: state.posts.posts,
  newPostText: state.posts.newPostText,
  profile: state.userProfile.profileData,
  profileEntityStatus: state.userProfile.entityStatus,
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

const WithRouterWrapper = withRouter(ProfileContainer);

export type UserProfilePropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  WithRouterPropsType;

// export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWrapper);
export default connect(mapStateToProps, { getUserProfile, addPost, updateNewPostText })(
  WithRouterWrapper,
);
