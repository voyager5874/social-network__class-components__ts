import { Component } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { UserOnServerType } from 'api/types';
import loadingAnimation from 'components/common/loadingVisualizer/assets/loading.gif';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { UsersPureFunc } from 'components/users/UsersPureFunc';
import { DATA_PORTION_SIZE } from 'constants/base';
import {
  followAC,
  setCurrentPageAC,
  setFetchingFalseAC,
  setFetchingTrueAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC,
} from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';
import 'react-circular-progressbar/dist/styles.css';

class UsersMiddleLayer extends Component<UsersPropsType> {
  componentDidMount(): void {
    const {
      setUsers,
      page,
      usersPerPage,
      setTotalUsersCount,
      setFetchingFalse,
      setFetchingTrue,
    } = this.props;
    setFetchingTrue();
    usersAPI.getUsers(page, usersPerPage).then(response => {
      setUsers(response.data.items);
      setTotalUsersCount(response.data.totalCount);
      setFetchingFalse();
    });
  }

  getPage = (pageNumber: number): void => {
    const {
      setCurrentPage,
      usersPerPage,
      setUsers,
      totalNumberOfPages,
      setFetchingFalse,
      setFetchingTrue,
      page,
    } = this.props;
    if (pageNumber > totalNumberOfPages || pageNumber < 1 || pageNumber === page) return;
    setFetchingTrue();
    setCurrentPage(pageNumber);
    usersAPI.getUsers(pageNumber, usersPerPage).then(response => {
      setUsers(response.data.items);
      setFetchingFalse();
    });
  };

  render(): ComponentReturnType {
    const { users, page, totalNumberOfPages, follow, unfollow, isFetching } = this.props;
    return isFetching ? (
      <LoadingVisualizer />
    ) : (
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
  setFetchingTrue: () => void;
  setFetchingFalse: () => void;
};

type MapStateToPropsType = {
  users: UserOnServerType[];
  // usersTotal: number;
  page: number;
  usersPerPage: number;
  totalNumberOfPages: number;
  isFetching: boolean;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  users: state.users.users,
  // usersTotal: state.users.totalCount,
  page: state.users.currentPage,
  usersPerPage: DATA_PORTION_SIZE,
  totalNumberOfPages: Math.ceil(state.users.totalCount / DATA_PORTION_SIZE),
  isFetching: state.users.isFetching,
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
  setFetchingTrue: () => {
    dispatch(setFetchingTrueAC());
  },
  setFetchingFalse: () => {
    dispatch(setFetchingFalseAC());
  },
});

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersMiddleLayer);

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;
