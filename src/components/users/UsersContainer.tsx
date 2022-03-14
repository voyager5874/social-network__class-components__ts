import { Component } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { usersAPI } from 'api';
import { UserOnServerType } from 'api/types';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { UsersPureFunc } from 'components/users/UsersPureFunc';
import { DATA_PORTION_SIZE } from 'constants/base';
import { ResponseCodes } from 'enums';
import { EntityStatus } from 'store/reducers/types';
import {
  addToBusyEntities,
  follow,
  removeFromBusyEntities,
  setCurrentPage,
  setFetchingFalse,
  setFetchingTrue,
  setTotalUsersCount,
  setUserEntityStatus,
  setUsers,
  unfollow,
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
      debugger;
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

  followUser = (userID: number): void => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setUserEntityStatus(userID, EntityStatus.busy);
    this.props.addToBusyEntities(userID);
    usersAPI.followUser(userID).then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.follow(userID);
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setUserEntityStatus(userID, EntityStatus.idle);
        this.props.removeFromBusyEntities(userID);
      }
    });
  };

  unfollowUser = (userID: number): void => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setUserEntityStatus(userID, EntityStatus.busy);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.addToBusyEntities(userID);
    usersAPI.unfollowUser(userID).then(response => {
      if (response.data.resultCode === ResponseCodes.Success) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.unfollow(userID);
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setUserEntityStatus(userID, EntityStatus.idle);
        // eslint-disable-next-line react/destructuring-assignment
        this.props.removeFromBusyEntities(userID);
      }
    });
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
  setUsers: (users: UserOnServerType[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalUsersCount: (count: number) => void;
  setFetchingTrue: () => void;
  setFetchingFalse: () => void;
  setUserEntityStatus: (userID: number, status: EntityStatus) => void;
  addToBusyEntities: (userID: number) => void;
  removeFromBusyEntities: (userID: number) => void;
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

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
  follow: (userId: number) => {
    dispatch(follow(userId));
  },
  unfollow: (userId: number) => {
    dispatch(unfollow(userId));
  },
  setUsers: (users: UserOnServerType[]) => {
    dispatch(setUsers(users));
  },
  setTotalUsersCount: (count: number) => {
    dispatch(setTotalUsersCount(count));
  },
  setCurrentPage: (page: number) => {
    dispatch(setCurrentPage(page));
  },
  setFetchingTrue: () => {
    dispatch(setFetchingTrue());
  },
  setFetchingFalse: () => {
    dispatch(setFetchingFalse());
  },
  setUserEntityStatus: (userID: number, status: EntityStatus) => {
    dispatch(setUserEntityStatus(userID, status));
  },
  addToBusyEntities: (userID: number) => {
    dispatch(addToBusyEntities(userID));
  },
  removeFromBusyEntities: (userID: number) => {
    dispatch(removeFromBusyEntities(userID));
  },
});

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersMiddleLayer);

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;
