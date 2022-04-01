import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

import styles from './Friends.module.css';

import { UserOnServerType } from 'api/types';
import noAvatar from 'components/common/assets/userWithoutPhoto.png';
import { getFriends } from 'store/middlewares/friends';
import { RootStateType } from 'store/types';

export const Friends = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  const friends = useSelector<RootStateType, UserOnServerType[]>(
    state => state.friends.users,
  );
  return (
    <ul className={styles.friendsList}>
      {friends.map(friend => (
        <li key={friend.id}>
          <NavLink className={styles.friendLink} to={`/profile/${friend.id}`}>
            <h3 className={styles.friendName}>{friend.name}</h3>
            <div className={styles.friendStatus}>{friend.status}</div>
            <img
              className={styles.friendAvatar}
              src={friend.photos.large ? friend.photos.large : noAvatar}
              alt="friend avatar"
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
