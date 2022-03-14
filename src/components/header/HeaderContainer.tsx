import { Component } from 'react';

import { connect } from 'react-redux';

import { authAPI } from 'api/authAPI';
import { AuthMeResponseDataType } from 'api/types';
import { Header } from 'components/header/Header';
import { ResponseCodes } from 'enums';
import { setAuthData, setLoginStatus } from 'store/reducers/authReducer';
import { RootStateType } from 'store/types';
import { Nullable } from 'types';

class HeaderContainer extends Component<HeaderPropsType> {
  componentDidMount() {
    authAPI.authMe().then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setAuthData(response.data.data);
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setLoginStatus(true);
      }
    });
  }

  render() {
    const { isLoggedIn, login } = this.props;
    return <Header isLoggedIn={isLoggedIn} login={login} />;
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
  setAuthData: (data: AuthMeResponseDataType) => void;
  setLoginStatus: (newStatus: boolean) => void;
};

type HeaderPropsType = mapStateToPropsType & MapDispatchToPropsType;

export default connect(mapStateToProps, { setAuthData, setLoginStatus })(HeaderContainer);
