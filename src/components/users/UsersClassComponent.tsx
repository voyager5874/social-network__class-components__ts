import React from 'react';

import userPic from './assets/user-pic-2.png';
import styles from './Users.module.css';

import { usersAPI } from 'api';
import { UserOnServerType } from 'api/types';
import { Paginator } from 'components/paginator/Paginator';
import { User } from 'components/users/user/User';
import { UsersPropsType } from 'components/users/UsersContainer';
import { ComponentReturnType } from 'types';

export class UsersClassComponent extends React.Component<UsersPropsType> {
  componentDidMount(): void {
    const { setUsers, page, usersPerPage, setTotalUsersCount } = this.props;
    usersAPI.getUsers(page, usersPerPage).then(response => {
      setUsers(response.data.items);
      setTotalUsersCount(response.data.totalCount);
    });
  }

  getPage = (pageNumber: number): void => {
    const { setCurrentPage, usersPerPage, setUsers, totalNumberOfPages } = this.props;
    if (pageNumber > totalNumberOfPages || pageNumber < 1) return;
    setCurrentPage(pageNumber);
    usersAPI
      .getUsers(pageNumber, usersPerPage)
      .then(response => setUsers(response.data.items));
  };

  render(): ComponentReturnType {
    const { users, page, totalNumberOfPages } = this.props;
    return (
      <div className={styles.users}>
        <Paginator
          totalNumberOfPages={totalNumberOfPages}
          currentPage={page}
          numberOfButtons={5}
          getPage={this.getPage}
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
            />
          ),
        )}
      </div>
    );
  }
}
