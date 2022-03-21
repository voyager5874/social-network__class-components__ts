import { Component, ComponentType } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { UserOnServerType } from 'api/types';
import { withAuthRedirect } from 'components/common/HOC/withAuthRedirect';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { UsersPureFunc } from 'components/users/UsersPureFunc';
import { DATA_PORTION_SIZE } from 'constants/base';
import { follow, getUsers, unfollow } from 'store/middlewares/users';
import { EntityStatus } from 'store/reducers/types';
import { setCurrentPage } from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';
import 'react-circular-progressbar/dist/styles.css';

class UsersContainer extends Component<UsersPropsType> {
  componentDidMount(): void {
    // const { page, usersPerPage, getUsers } = this.props;
    this.props.getUsers(this.props.page, this.props.usersPerPage);
  }

  getPage = (pageNumber: number): void => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
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
    const { users, page, totalNumberOfPages, entityStatus, busyUserEntities } =
      this.props;
    return entityStatus === EntityStatus.busy ? (
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
        busyEntities={busyUserEntities}
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
  entityStatus: EntityStatus;
  busyUserEntities: Array<number>;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  users: state.users.users,
  // usersTotal: state.users.totalCount,
  page: state.users.currentPage,
  usersPerPage: DATA_PORTION_SIZE,
  totalNumberOfPages: Math.ceil(state.users.totalCount / DATA_PORTION_SIZE),
  entityStatus: state.users.entityStatus,
  busyUserEntities: state.users.busyEntities,
});

// export const UsersContainer = connect(mapStateToProps, {
//   follow,
//   unfollow,
//   getUsers,
//   setCurrentPage,
// })(UsersMiddleLayer);

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;

export default compose<ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, {
    follow,
    unfollow,
    getUsers,
    setCurrentPage,
  }),
)(UsersContainer);
