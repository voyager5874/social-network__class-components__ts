import { Component } from 'react';

import { connect } from 'react-redux';

import { authAPI } from 'api/authAPI';
import { AuthMeResponseDataType } from 'api/types';
import { Header } from 'components/header/Header';
import { ResponseCodes } from 'enums';
import { initializeApp } from 'store/middlewares/app';
import { logout } from 'store/middlewares/login';
import { setAuthData, setLoginStatus } from 'store/reducers/authReducer';
import { RootStateType } from 'store/types';
import { Nullable } from 'types';

class HeaderContainer extends Component<HeaderPropsType> {
  componentDidMount() {
    // this.props.authCurrentUser(); // useEffect in App.tsx ?
  }

  render() {
    const { isLoggedIn, login } = this.props;
    return <Header isLoggedIn={isLoggedIn} login={login} logout={this.props.logout} />;
  }
}

type mapStateToPropsType = {
  isLoggedIn: boolean;
  login: Nullable<string>;
};

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
  isLoggedIn: state.authData.isLoggedIn,
  login: state.authData.login,
});

type MapDispatchToPropsType = {
  // eslint-disable-next-line react/no-unused-prop-types
  authCurrentUser: () => void;
  logout: () => void;
};

type HeaderPropsType = mapStateToPropsType & MapDispatchToPropsType;

export default connect(mapStateToProps, { authCurrentUser: initializeApp, logout })(
  HeaderContainer,
);
