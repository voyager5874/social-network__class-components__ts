import { Component, ComponentType } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { UserOnServerType } from 'api/types';
import { withAuthRedirect } from 'components/common/HOC/withAuthRedirect';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { UsersPureFunc } from 'components/users/UsersPureFunc';
import { DATA_PORTION_SIZE } from 'constants/base';
import { changeFollowedByCurrentUserState, getUsers } from 'store/middlewares/users';
import { EntityStatus } from 'store/reducers/types';
import { setCurrentPage, setUsersPerPageCount } from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';
import 'react-circular-progressbar/dist/styles.css';

class UsersContainer extends Component<UsersPropsType> {
  componentDidMount(): void {
    // const { page, usersPerPage, getUsers } = this.props;
    this.props.getUsers(this.props.page, this.props.perPageCount);
  }

  getPage = (pageNumber: number, pageSize: number): void => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setCurrentPage,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      getUsers,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setUsersPerPageCount,
    } = this.props;
    setUsersPerPageCount(pageSize);
    setCurrentPage(pageNumber);
    getUsers(pageNumber, pageSize); // is this violation of flux ?
  };

  followUser = (userID: number): void => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeFollowedByCurrentUserState(userID, true);
  };

  unfollowUser = (userID: number): void => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeFollowedByCurrentUserState(userID, false);
  };

  render(): ComponentReturnType {
    const { users, page, entityStatus, busyUserEntities, totalUsersCount, perPageCount } =
      this.props;
    return entityStatus === EntityStatus.busy ? (
      <LoadingVisualizer />
    ) : (
      <UsersPureFunc
        users={users}
        currentPage={page}
        getPage={this.getPage}
        follow={this.followUser}
        unfollow={this.unfollowUser}
        busyEntities={busyUserEntities}
        totalUsersCount={totalUsersCount}
        perPage={perPageCount}
      />
    );
  }
}

type MapDispatchToPropsType = {
  // follow: (userID: number) => void;
  // unfollow: (userID: number) => void;
  changeFollowedByCurrentUserState: (userID: number, newFollowedState: boolean) => void;
  setCurrentPage: (page: number) => void;
  getUsers: (pageNumber: number, usersPerPage: number) => void;
  setUsersPerPageCount: (newCount: number) => void;
};

type MapStateToPropsType = {
  users: UserOnServerType[];
  // usersTotal: number;
  page: number;
  entityStatus: EntityStatus;
  busyUserEntities: Array<number>;
  totalUsersCount: number;
  perPageCount: number;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  users: state.users.users,
  // usersTotal: state.users.totalCount,
  page: state.users.currentPage,
  totalUsersCount: state.users.totalCount,
  entityStatus: state.users.entityStatus,
  busyUserEntities: state.users.busyEntities,
  perPageCount: state.users.itemsPerPage,
});

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;

export default compose<ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, {
    // follow,
    // unfollow,
    changeFollowedByCurrentUserState,
    getUsers,
    setCurrentPage,
    setUsersPerPageCount,
  }),
)(UsersContainer);
