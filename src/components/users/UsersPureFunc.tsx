import React from 'react';

import userPic from './assets/user-pic-2.png';
import styles from './Users.module.css';

import { UserOnServerType } from 'api/types';
import { Paginator } from 'components/paginator/Paginator';
import { User } from 'components/users/user/User';
import { ComponentReturnType } from 'types';

type UsersPureFuncPropsType = {
  users: UserOnServerType[];
  currentPage: number;
  numberOfPages: number;
  getPage: (page: number) => void;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
};

export const UsersPureFunc = ({
  users,
  currentPage,
  getPage,
  numberOfPages,
  follow,
  unfollow,
}: UsersPureFuncPropsType): ComponentReturnType => (
  <div className={styles.users}>
    <Paginator
      totalNumberOfPages={numberOfPages}
      currentPage={currentPage}
      numberOfButtons={5}
      getPage={getPage}
    />
    {users.map(
      ({ id, status, name, uniqueUrlName, followed, photos }: UserOnServerType) => (
        <User
          key={id}
          name={name}
          id={id}
          followed={followed}
          status={status || ''}
          photo={photos.small ? photos.small : userPic}
          uniqueUrlName={uniqueUrlName || ''}
          follow={follow}
          unfollow={unfollow}
        />
      ),
    )}
  </div>
);
