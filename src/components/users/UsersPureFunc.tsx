import React from 'react';

import { Pagination } from 'antd';

import userPic from './assets/user-pic-2.png';
import styles from './Users.module.css';

import { UserOnServerType } from 'api/types';
import { User } from 'components/users/user/User';
import { ComponentReturnType } from 'types';

type UsersPureFuncPropsType = {
  users: UserOnServerType[];
  currentPage: number;
  getPage: (pageNumber: number, pageSize: number) => void;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  busyEntities: Array<number>;
  totalUsersCount: number;
  perPage: number;
};

export const UsersPureFunc = ({
  users,
  currentPage,
  getPage,
  follow,
  unfollow,
  busyEntities,
  totalUsersCount,
  perPage,
}: UsersPureFuncPropsType): ComponentReturnType => (
  <div className={styles.page}>
    <div className={styles.paginatorContainer}>
      <Pagination
        className={styles.paginator}
        defaultCurrent={1}
        current={currentPage}
        onChange={getPage}
        total={totalUsersCount}
        defaultPageSize={12}
        pageSizeOptions={[12, 20, 50, 100]}
        pageSize={perPage}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
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
