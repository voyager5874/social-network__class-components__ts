import React from 'react';

import userPic from './assets/user-pic-2.png';
import styles from './Users.module.css';

import { usersAPI } from 'api';
import { User } from 'components/users/user/User';
import { UsersPropsType } from 'components/users/UsersContainer';

export class UsersClassComponent extends React.Component {
  componentDidMount(): void {
    const { setUsers } = this.props;
    usersAPI.getUsers().then(response => setUsers(response.data.items));
  }

  render() {
    const { users } = this.props;
    return (
      <div className={styles.users}>
        {users.map(({ id, status, name, uniqueUrlName, followed, photos }) => (
          <User
            key={id}
            name={name}
            id={id}
            followed={followed}
            status={status || ''}
            photo={photos.small ? photos.small : userPic}
          />
        ))}
      </div>
    );
  }
}
