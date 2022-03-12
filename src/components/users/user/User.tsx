import { NavLink } from 'react-router-dom';

import styles from './User.module.css';

import { ComponentReturnType } from 'types';

type UserPropsType = {
  id: number;
  name: string;
  status: string;
  followed: boolean;
  photo: string;
  uniqueUrlName: string;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
};

export const User = ({
  id,
  name,
  status,
  followed,
  photo,
  uniqueUrlName,
  follow,
  unfollow,
}: UserPropsType): ComponentReturnType => {
  const handleFollowClick = (userID: number): void => {
    follow(userID);
  };

  const handleUnfollowClick = (userID: number): void => {
    unfollow(userID);
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.userPicture}>
        <h3>{name}</h3>
        <NavLink to={`/profile/${id}`}>
          <img className={styles.userAvatar} src={photo} alt="avatar" />
        </NavLink>
      </div>
      <div className={styles.userTextInfo}>
        <div>{status}</div>
        <div>{uniqueUrlName}</div>
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
