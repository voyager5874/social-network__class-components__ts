import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UserOnServerType } from 'api/types';
import { UsersClassComponent } from 'components/users/UsersClassComponent';
import { DATA_PORTION_SIZE } from 'constants/base';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC,
} from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';

type MapDispatchToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: UserOnServerType[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalUsersCount: (count: number) => void;
};

type MapStateToPropsType = {
  users: UserOnServerType[];
  total: number;
  page: number;
  usersPerPage: number;
  totalNumberOfPages: number;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  users: state.users.users,
  total: state.users.totalCount,
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
)(UsersClassComponent);

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;
