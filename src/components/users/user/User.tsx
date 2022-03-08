import { useDispatch } from 'react-redux';

import styles from './User.module.css';

import { followAC, unfollowAC } from 'store/reducers/usersReducer';
import { ComponentReturnType } from 'types';

type UserPropsType = {
  id: number;
  name: string;
  status: string;
  followed: boolean;
  photo: string;
};

export const User = ({
  id,
  name,
  status,
  followed,
  photo,
}: UserPropsType): ComponentReturnType => {
  const dispatch = useDispatch();

  const handleFollowClick = (userID: number): void => {
    dispatch(followAC(userID));
  };

  const handleUnfollowClick = (userID: number): void => {
    dispatch(unfollowAC(userID));
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.userPicture}>
        <h3>{name}</h3>
        <img className={styles.userAvatar} src={photo} alt="avatar" />
      </div>
      <div className={styles.userTextInfo}>
        <div>{status}</div>
        <div>USA</div>
        <div>New York</div>
      </div>
      <div className={styles.controls}>
        {followed ? (
          <button
            className={styles.button}
            type="button"
            onClick={() => handleUnfollowClick(id)}
          >
            unfollow
          </button>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={() => handleFollowClick(id)}
          >
            follow
          </button>
        )}
      </div>
    </div>
  );
};
