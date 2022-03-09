import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import userPic from './assets/user-pic-2.png';
import styles from './Users.module.css';

import { UserOnServerType } from 'api/types';
import { usersAPI } from 'api/usersAPI';
import { User } from 'components/users/user/User';
import { DATA_PORTION_SIZE } from 'constants/base';
import { setUsersAC } from 'store/reducers/usersReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

export const Users = (): ComponentReturnType => {
  const users = useSelector<RootStateType, UserOnServerType[]>(
    state => state.users.users,
  );
  const page = useSelector<RootStateType, number>(state => state.users.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    usersAPI
      .getUsers(page, DATA_PORTION_SIZE)
      .then(response => dispatch(setUsersAC(response.data.items)));
  }, []);
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
          uniqueUrlName={uniqueUrlName || ''}
        />
      ))}
    </div>
  );
};
