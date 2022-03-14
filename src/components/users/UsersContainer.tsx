import { Component } from 'react';

import { connect } from 'react-redux';

import { UserOnServerType } from 'api/types';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { UsersPureFunc } from 'components/users/UsersPureFunc';
import { DATA_PORTION_SIZE } from 'constants/base';
import { follow, getUsers, unfollow } from 'store/middlewares/users';
import { setCurrentPage } from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';
import 'react-circular-progressbar/dist/styles.css';

class UsersMiddleLayer extends Component<UsersPropsType> {
  componentDidMount(): void {
    // const { page, usersPerPage, getUsers } = this.props;
    this.props.getUsers(this.props.page, this.props.usersPerPage);
  }

  getPage = (pageNumber: number): void => {
    const { setCurrentPage, usersPerPage, totalNumberOfPages, page, getUsers } =
      this.props;
    if (pageNumber > totalNumberOfPages || pageNumber < 1 || pageNumber === page) return;
    setCurrentPage(pageNumber);
    getUsers(pageNumber, usersPerPage);
  };

  followUser = (userID: number): void => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.follow(userID);
  };

  unfollowUser = (userID: number): void => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.unfollow(userID);
  };

  render(): ComponentReturnType {
    const { users, page, totalNumberOfPages, isFetching, busyEntities } = this.props;
    return isFetching ? (
      <LoadingVisualizer />
    ) : (
      <UsersPureFunc
        users={users}
        currentPage={page}
        getPage={this.getPage}
        numberOfPages={totalNumberOfPages}
        follow={this.followUser}
        unfollow={this.unfollowUser}
        leapValue={10}
        busyEntities={busyEntities}
      />
    );
  }
}

type MapDispatchToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setCurrentPage: (page: number) => void;
  getUsers: (pageNumber: number, usersPerPage: number) => void;
};

type MapStateToPropsType = {
  users: UserOnServerType[];
  // usersTotal: number;
  page: number;
  usersPerPage: number;
  totalNumberOfPages: number;
  isFetching: boolean;
  busyEntities: Array<number>;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  users: state.users.users,
  // usersTotal: state.users.totalCount,
  page: state.users.currentPage,
  usersPerPage: DATA_PORTION_SIZE,
  totalNumberOfPages: Math.ceil(state.users.totalCount / DATA_PORTION_SIZE),
  isFetching: state.users.isFetching,
  busyEntities: state.users.busyEntities,
});

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
//   follow: (userId: number) => {
//     dispatch(follow(userId));
//   },
//   unfollow: (userId: number) => {
//     dispatch(unfollow(userId));
//   },
//   setUsers: (users: UserOnServerType[]) => {
//     dispatch(setUsers(users));
//   },
//   setTotalUsersCount: (count: number) => {
//     dispatch(setTotalUsersCount(count));
//   },
//   setCurrentPage: (page: number) => {
//     dispatch(setCurrentPage(page));
//   },
//   setUserEntityStatus: (userID: number, status: EntityStatus) => {
//     dispatch(setUserEntityStatus(userID, status));
//   },
//
// });

export const UsersContainer = connect(mapStateToProps, {
  follow,
  unfollow,
  getUsers,
  setCurrentPage,
})(UsersMiddleLayer);

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;
