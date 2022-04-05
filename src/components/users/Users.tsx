import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import userPic from './assets/user-pic-2.png';
import styles from './Users.module.css';

import { UserOnServerType } from 'api/types';
import { Paginator } from 'components/paginator/Paginator';
import { User } from 'components/users/user/User';
import { getUsers } from 'store/middlewares/users';
import { setFollowedByCurrentUserState } from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

export const Users = (): ComponentReturnType => {
  const users = useSelector<RootStateType, UserOnServerType[]>(
    state => state.users.users,
  );
  const busy = useSelector<RootStateType, Array<number>>(
    state => state.users.busyEntities,
  );
  const page = useSelector<RootStateType, number>(state => state.users.currentPage);
  const totalNumberOfUsers = useSelector<RootStateType, Nullable<number>>(
    state => state.users.totalCount,
  );

  const pageSize = useSelector<RootStateType, number>(state => state.users.itemsPerPage);

  const dispatch = useDispatch();

  const numberOfPages = Math.ceil((totalNumberOfUsers || 0) / pageSize);

  const getPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > numberOfPages) return;
    dispatch(getUsers(page, pageSize));
  };

  useEffect(() => {
    // usersAPI
    //   .getUsers(page, pageSize)
    //   .then(response => dispatch(setUsers(response.data.items)));
    dispatch(getUsers(page, pageSize));
  }, []);

  const handleFollow = (id: number) => {
    dispatch(setFollowedByCurrentUserState(id, true));
  };

  const handleUnfollow = (id: number) => {
    dispatch(setFollowedByCurrentUserState(id, false));
  };

  return (
    <div className={styles.page}>
      <Paginator
        totalNumberOfPages={numberOfPages}
        currentPage={page}
        numberOfButtons={5}
        getPage={getPage}
        leapValue={10}
      />
      <div className={styles.users}>
        {users.map(({ id, status, name, uniqueUrlName, followed, photos }) => (
          <User
            city="New York"
            country="USA"
            key={id}
            name={name}
            id={id}
            followed={followed}
            status={status || ''}
            photo={photos.small ? photos.small : userPic}
            uniqueUrlName={uniqueUrlName || ''}
            follow={() => handleFollow(id)}
            unfollow={() => handleUnfollow(id)}
            busyEntities={busy}
          />
        ))}
      </div>
    </div>
  );
};
