import React from 'react';

import userPic from './assets/user-pic-2.png';
import styles from './Users.module.css';

import { usersAPI } from 'api';
import { UserOnServerType } from 'api/types';
import { User } from 'components/users/user/User';
import { UsersPropsType } from 'components/users/UsersContainer';
import { ComponentReturnType } from 'types';

export class UsersClassComponent extends React.Component<UsersPropsType> {
  componentDidMount(): void {
    const { setUsers, page, usersPerPage, setTotalUsersCount } = this.props;
    usersAPI.getUsers(page, usersPerPage).then(response => {
      setUsers(response.data.items);
      debugger;
      setTotalUsersCount(response.data.totalCount);
    });
  }

  getPage = (pageNumber: number): void => {
    debugger;
    const { setCurrentPage, usersPerPage, setUsers } = this.props;
    setCurrentPage(pageNumber);
    usersAPI
      .getUsers(pageNumber, usersPerPage)
      .then(response => setUsers(response.data.items));
  };

  render(): ComponentReturnType {
    const { users, page, usersPerPage, total } = this.props;
    const totalNumberOfPages = Math.ceil(total / usersPerPage);
    const numberOfButtons = 5;
    const pageSelectionButtonSet = [];
    if (page >= totalNumberOfPages - numberOfButtons && totalNumberOfPages !== 0) {
      debugger;
      for (
        let i = totalNumberOfPages - numberOfButtons;
        i <= totalNumberOfPages;
        i += 1
      ) {
        pageSelectionButtonSet.push(i);
      }
    } else if (page <= totalNumberOfPages - numberOfButtons * 2) {
      for (let i = page; i <= page + numberOfButtons; i += 1) {
        pageSelectionButtonSet.push(i);
      }
    }

    return (
      <div className={styles.users}>
        <div>
          <button type="button" onClick={() => this.getPage(1)}>
            go to 1
          </button>
          {pageSelectionButtonSet.map(pageNumber => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => this.getPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button type="button" onClick={() => this.getPage(totalNumberOfPages)}>
            got to last
          </button>
        </div>
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
