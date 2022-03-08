import React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UserOnServerType } from 'api/types';
import { UsersClassComponent } from 'components/users/UsersClassComponent';
import { followAC, setUsersAC, unfollowAC } from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';

type MapDispatchToPropsType = {
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  setUsers: (users: UserOnServerType[]) => void;
};

type MapStateToPropsType = {
  users: Array<UserOnServerType>;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
  follow: (userId: number) => {
    dispatch(followAC(userId));
  },
  unfollow: (userId: number) => {
    dispatch(unfollowAC(userId));
  },
  setUsers: (users: UserOnServerType[]) => {
    dispatch(setUsersAC(users));
  },
});

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersClassComponent);

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;
