import { createSelector } from 'reselect';

import { EntityStatus, UserInAppType } from 'store/reducers/types';
import { RootStateType } from 'store/types';
import { Nullable } from 'types';

export const selectUsers = (state: RootStateType): Array<UserInAppType> =>
  state.users.users;

export const selectUsersPageSize = (state: RootStateType): number =>
  state.users.itemsPerPage;

export const selectUsersCurrentPage = (state: RootStateType): number =>
  state.users.currentPage;

export const selectUsersTotalCount = (state: RootStateType): Nullable<number> =>
  state.users.totalCount;

export const selectUsersBusyEntitiesIdList = (state: RootStateType): Array<number> =>
  state.users.busyEntities;

export const selectUsersEntityStatus = (state: RootStateType): EntityStatus =>
  state.users.entityStatus;

// just for possibly employing reselect
// const findBusyEntitiesUsersID = (state: RootStateType): Array<number> => {
//   const currentlyProcessed = state.users.users.filter(
//     user => user.entityStatus === EntityStatus.busy,
//   );
//   return currentlyProcessed.map(user => user.id);
// };
//
const findBusyUsersEntities = (state: RootStateType): Array<UserInAppType> => {
  const currentlyProcessed = state.users.users.filter(
    user => user.entityStatus === EntityStatus.busy,
  );
  return currentlyProcessed;
};

export const selectUsersBusyEntities = createSelector([findBusyUsersEntities], users =>
  // (users || []).map(user => user.id),
  users.map(user => user.id),
);
