import { Component } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { UserOnServerType } from 'api/types';
import { UsersPureFunc } from 'components/users/UsersPureFunc';
import { DATA_PORTION_SIZE } from 'constants/base';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC,
} from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

class UsersMiddleLayer extends Component<UsersPropsType> {
  componentDidMount(): void {
    const { setUsers, page, usersPerPage, setTotalUsersCount } = this.props;
    usersAPI.getUsers(page, usersPerPage).then(response => {
      setUsers(response.data.items);
      setTotalUsersCount(response.data.totalCount);
    });
  }

  getPage = (pageNumber: number): void => {
    const { setCurrentPage, usersPerPage, setUsers, totalNumberOfPages } = this.props;
    if (pageNumber > totalNumberOfPages || pageNumber < 1) return;
    setCurrentPage(pageNumber);
    usersAPI
      .getUsers(pageNumber, usersPerPage)
      .then(response => setUsers(response.data.items));
  };

  render(): ComponentReturnType {
    const { users, page, totalNumberOfPages, follow, unfollow } = this.props;
    return (
      <UsersPureFunc
        users={users}
        currentPage={page}
        getPage={this.getPage}
        numberOfPages={totalNumberOfPages}
        follow={follow}
        unfollow={unfollow}
      />
    );
  }
}

type MapDispatchToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: UserOnServerType[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalUsersCount: (count: number) => void;
};

type MapStateToPropsType = {
  users: UserOnServerType[];
  // usersTotal: number;
  page: number;
  usersPerPage: number;
  totalNumberOfPages: number;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  users: state.users.users,
  // usersTotal: state.users.totalCount,
  page: state.users.currentPage,
  usersPerPage: DATA_PORTION_SIZE,
  totalNumberOfPages: Math.ceil(state.users.totalCount / DATA_PORTION_SIZE),
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
  setTotalUsersCount: (count: number) => {
    dispatch(setTotalUsersCountAC(count));
  },
  setCurrentPage: (page: number) => {
    dispatch(setCurrentPageAC(page));
  },
});

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersMiddleLayer);

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;
