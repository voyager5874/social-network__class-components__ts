import React from 'react';

import styles from './ProfileInfo.module.css';

import { STRING_STUB_SHORT } from 'constants/base';
import { ComponentReturnType } from 'types';

export const ProfileInfo = (): ComponentReturnType => (
  <div>
    <div>
      <img
        className={styles.profilePicture}
        src="https://www.usccb.org/sites/default/files/styles/office_hero/public/2020-04/GettyImages-1093935162.jpg?itok=IhD73nd3"
        alt="profile"
      />
    </div>
    <div className={styles.about}>{STRING_STUB_SHORT}</div>
  </div>
);
