import React from 'react';

import { Pagination } from 'antd';

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
  leapValue: number;
  busyEntities: Array<number>;
  totalUsersCount: number;
};

export const UsersPureFunc = ({
  users,
  currentPage,
  getPage,
  numberOfPages,
  follow,
  unfollow,
  leapValue,
  busyEntities,
  totalUsersCount,
}: UsersPureFuncPropsType): ComponentReturnType => (
  <div className={styles.page}>
    {/* <Paginator */}
    {/*  totalNumberOfPages={numberOfPages} */}
    {/*  currentPage={currentPage} */}
    {/*  numberOfButtons={5} */}
    {/*  getPage={getPage} */}
    {/*  leapValue={leapValue} */}
    {/* /> */}
    <div className={styles.paginatorContainer}>
      <Pagination
        className={styles.paginator}
        defaultCurrent={1}
        current={currentPage}
        onChange={getPage}
        total={totalUsersCount}
        pageSize={12}
        // showSizeChanger
        // showQuickJumper
        // showTotal={total => `Total ${total} items`}
      />
    </div>

    <div className={styles.users}>
      {users.map(
        ({ id, status, name, uniqueUrlName, followed, photos }: UserOnServerType) => (
          <User
            key={id}
            country="USA"
            city="New York"
            name={name}
            id={id}
            followed={followed}
            status={status || ''}
            photo={photos.small ? photos.small : userPic}
            uniqueUrlName={uniqueUrlName || ''}
            follow={follow}
            unfollow={unfollow}
            busyEntities={busyEntities}
          />
        ),
      )}
    </div>
  </div>
);
