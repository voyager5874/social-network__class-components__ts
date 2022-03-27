import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './Friends.module.css';

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
    <div>
      {friends.map(friend => (
        <div key={friend.id}>
          <h3>{friend.name}</h3>
          <div>{friend.status}</div>
          <img
            src={friend.photos.large ? friend.photos.large : noAvatar}
            alt="friend avatar"
          />
        </div>
      ))}
    </div>
  );
};
