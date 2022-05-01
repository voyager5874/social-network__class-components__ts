import { Component, ComponentType } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { UserOnServerType } from 'api/types';
import { withAuthRedirect } from 'components/common/HOC/withAuthRedirect';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { UsersPureFunc } from 'components/users/UsersPureFunc';
import { changeFollowedByCurrentUserState, getUsers } from 'store/middlewares/users';
import { EntityStatus } from 'store/reducers/types';
import { setCurrentPage, setUsersPerPageCount } from 'store/reducers/usersReducer';
// import 'react-circular-progressbar/dist/styles.css';
import {
  selectUsers,
  selectUsersBusyEntities,
  selectUsersCurrentPage,
  selectUsersEntityStatus,
  selectUsersPageSize,
  selectUsersTotalCount,
} from 'store/selectors';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

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
  changeFollowedByCurrentUserState: typeof changeFollowedByCurrentUserState;
  setCurrentPage: typeof setCurrentPage;
  getUsers: typeof getUsers;
  setUsersPerPageCount: typeof setUsersPerPageCount;
};

type MapStateToPropsType = {
  users: UserOnServerType[];
  page: number;
  entityStatus: EntityStatus;
  busyUserEntities: Array<number>;
  totalUsersCount: Nullable<number>;
  perPageCount: number;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  users: selectUsers(state),
  page: selectUsersCurrentPage(state),
  totalUsersCount: selectUsersTotalCount(state),
  entityStatus: selectUsersEntityStatus(state),
  // busyUserEntities: selectUsersBusyEntitiesIdList(state),
  busyUserEntities: selectUsersBusyEntities(state),
  perPageCount: selectUsersPageSize(state),
});

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;

export default compose<ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, {
    changeFollowedByCurrentUserState,
    getUsers,
    setCurrentPage,
    setUsersPerPageCount,
  }),
)(UsersContainer);
