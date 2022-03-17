import { ComponentType } from 'react';

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootStateType } from 'store/types';

type mapStateToPropsType = {
  isAuth: boolean;
};

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
  isAuth: state.authData.isLoggedIn,
});

export function withAuthRedirect<T>(Component: ComponentType<T>): ComponentType {
  const RedirectingComponent = (props: mapStateToPropsType) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to="/login" />;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...(restProps as T)} />;
  };

  return connect(mapStateToProps)(RedirectingComponent);
}
