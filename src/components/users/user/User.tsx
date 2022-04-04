import { NavLink } from 'react-router-dom';

import styles from './User.module.css';

import { ToggleButton } from 'components/common/toggleButton/ToggleButton';
import { UniversalButton } from 'components/common/universalButton/UniversalButton';
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
  busyEntities: Array<number>;
  country: string;
  city: string;
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
  busyEntities,
  country,
  city,
}: UserPropsType): ComponentReturnType => {
  const buttonDisabled = busyEntities.includes(id);

  const handleFollowedStatusChange = (newStatus: boolean) => {
    if (newStatus === true) follow(id);
    if (newStatus === false) unfollow(id);
  };
  return (
    <div className={styles.userCard}>
      <NavLink
        to={`/profile/${id}`}
        style={{ textDecoration: 'none', marginBottom: '20px' }}
      >
        <div className={styles.pictureBlock}>
          <h3>{name}</h3>
          <div className={styles.status}>{status}</div>
          <img className={styles.avatar} src={photo} alt="avatar" />
        </div>
        <div className={styles.textBlock}>
          <div>{uniqueUrlName}</div>
          <div>County: {country}</div>
          <div>City: {city}</div>
        </div>
      </NavLink>

      <div className={styles.controls}>
        <ToggleButton
          changeValueCallback={handleFollowedStatusChange}
          labelForTrueValue="unfollow"
          labelForFalseValue="follow"
          currentToggledValue={followed}
          disabled={buttonDisabled}
          className={styles.button}
        />
        <UniversalButton>message</UniversalButton>
      </div>
    </div>
  );
};
