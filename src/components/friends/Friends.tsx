import { useEffect } from 'react';

import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

import styles from './Friends.module.css';

import { UserOnServerType } from 'api/types';
import noAvatar from 'components/common/assets/userWithoutPhoto.png';
import { getFriends } from 'store/middlewares/friends';
import {
  setFriendsListCurrentPage,
  setFriendsPerPageCount,
} from 'store/reducers/friends';
import { RootStateType } from 'store/types';
import { Nullable } from 'types';

export const Friends = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  const currentPage = useSelector<RootStateType, number>(
    state => state.friends.currentPage,
  );

  const perPage = useSelector<RootStateType, number>(state => state.friends.itemsPerPage);

  useEffect(() => {
    dispatch(getFriends(currentPage, perPage));
  }, [currentPage, perPage]);

  const friends = useSelector<RootStateType, UserOnServerType[]>(
    state => state.friends.users,
  );

  const totalCount = useSelector<RootStateType, Nullable<number>>(
    state => state.friends.totalCount,
  );

  const handlePageChange = (pageNumber: number, pageSize: number) => {
    dispatch(setFriendsPerPageCount(pageSize));
    dispatch(setFriendsListCurrentPage(pageNumber));
  };
  return (
    <div>
      <Pagination
        className={styles.paginator}
        showSizeChanger
        total={totalCount || 0}
        defaultPageSize={12}
        pageSizeOptions={[12, 20, 50, 100]}
        pageSize={perPage}
        current={currentPage}
        onChange={handlePageChange}
      />
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
    </div>
  );
};
