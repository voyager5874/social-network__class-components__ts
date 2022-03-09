import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import userPic from './assets/user-pic-2.png';
import styles from './Users.module.css';

import { UserOnServerType } from 'api/types';
import { usersAPI } from 'api/usersAPI';
import { Paginator } from 'components/paginator/Paginator';
import { User } from 'components/users/user/User';
import { DATA_PORTION_SIZE } from 'constants/base';
import { followAC, setUsersAC, unfollowAC } from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

export const Users = (): ComponentReturnType => {
  const users = useSelector<RootStateType, UserOnServerType[]>(
    state => state.users.users,
  );
  const page = useSelector<RootStateType, number>(state => state.users.currentPage);
  const totalNumberOfUsers = useSelector<RootStateType, number>(
    state => state.users.totalCount,
  );
  const dispatch = useDispatch();

  const numberOfPages = Math.ceil(totalNumberOfUsers / DATA_PORTION_SIZE);

  const getPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > numberOfPages) return;
    usersAPI
      .getUsers(pageNumber, DATA_PORTION_SIZE)
      .then(response => dispatch(setUsersAC(response.data.items)));
  };

  useEffect(() => {
    usersAPI
      .getUsers(page, DATA_PORTION_SIZE)
      .then(response => dispatch(setUsersAC(response.data.items)));
  }, []);

  const handleFollow = (id: number) => {
    dispatch(followAC(id));
  };

  const handleUnfollow = (id: number) => {
    dispatch(unfollowAC(id));
  };

  return (
    <div className={styles.users}>
      <Paginator
        totalNumberOfPages={numberOfPages}
        currentPage={page}
        numberOfButtons={5}
        getPage={getPage}
      />
      {users.map(({ id, status, name, uniqueUrlName, followed, photos }) => (
        <User
          key={id}
          name={name}
          id={id}
          followed={followed}
          status={status || ''}
          photo={photos.small ? photos.small : userPic}
          uniqueUrlName={uniqueUrlName || ''}
          follow={() => handleFollow(id)}
          unfollow={() => handleUnfollow(id)}
        />
      ))}
    </div>
  );
};
