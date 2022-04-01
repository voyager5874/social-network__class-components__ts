import { Component, ComponentType } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from 'components/common';
import { WithRouterPropsType } from 'components/common/HOC/types';
import { Header } from 'components/header/Header';
import { initializeApp } from 'store/middlewares/app';
import { logout } from 'store/middlewares/login';
import { RootStateType } from 'store/types';
import { Nullable } from 'types';

class HeaderContainer extends Component<HeaderPropsType> {
  componentDidMount() {
    // this.props.authCurrentUser(); // useEffect in App.tsx ?
  }

  logout = () => {
    this.props.logout();
    this.props.router.navigate('/login');
  };

  render() {
    const { isLoggedIn, login, name, photo } = this.props;
    return (
      <Header
        isLoggedIn={isLoggedIn}
        login={login}
        logout={this.logout}
        name={name}
        photo={photo}
      />
    );
  }
}

type mapStateToPropsType = {
  isLoggedIn: boolean;
  login: Nullable<string>;
  name: Nullable<string>;
  photo: Nullable<string>;
};

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
  isLoggedIn: state.authData.isLoggedIn,
  login: state.authData.login,
  name: state.authData.fullName,
  photo: state.authData.photo,
});

type MapDispatchToPropsType = {
  // eslint-disable-next-line react/no-unused-prop-types
  authCurrentUser: () => void;
  logout: () => void;
};

type HeaderPropsType = mapStateToPropsType & MapDispatchToPropsType & WithRouterPropsType;

export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { authCurrentUser: initializeApp, logout }),
)(HeaderContainer);
