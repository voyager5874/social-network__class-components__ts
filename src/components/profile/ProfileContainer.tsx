import { Component } from 'react';

import { connect } from 'react-redux';

import { usersAPI } from 'api';
import { GetUserProfileResponseType } from 'api/types';
import { withRouter } from 'components/common';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { Profile } from 'components/profile/Profile';
import { setUserProfile } from 'store/reducers/userProfileReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

class ProfileContainer extends Component<UserProfilePropsType> {
  componentDidMount(): void {
    debugger;
    // eslint-disable-next-line react/destructuring-assignment
    let userID = this.props.router.params.id;
    if (!userID) {
      userID = '21647'; // check nested routes
      // eslint-disable-next-line react/destructuring-assignment
      this.props.router.navigate(`/profile/${userID}`);
    }
    usersAPI
      .getUserProfile(userID)
      // eslint-disable-next-line react/destructuring-assignment
      .then(response => this.props.setUserProfile(response.data));
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

    return userId === null ? (
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
      />
    );
  }
}

type MapDispatchToPropsType = {
  setUserProfile: (userProfileData: GetUserProfileResponseType) => void;
};

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
//   setUserProfile: data => {
//     dispatch(setUserProfile(data));
//   },
// });

type MapStateToPropsType = {
  profile: GetUserProfileResponseType;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  profile: state.userProfile,
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

type WithParamsPropsType = {
  params: {
    id: string;
  };
};

const WithRouterWrapper = withRouter(ProfileContainer);

export type UserProfilePropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  WithRouterPropsType;

// export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWrapper);
export default connect(mapStateToProps, { setUserProfile })(WithRouterWrapper);
