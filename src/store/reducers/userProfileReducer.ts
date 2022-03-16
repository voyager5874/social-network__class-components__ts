import { GetUserProfileResponseType } from 'api/types';
import { EntityStatus, UserProfileReducerStateType } from 'store/reducers/types';

const initialState: UserProfileReducerStateType = {
  profileData: {
    aboutMe: null,
    contacts: {
      facebook: null,
      website: null,
      vk: null,
      twitter: null,
      instagram: null,
      youtube: null,
      github: null,
      mainLink: null,
    },
    lookingForAJob: null,
    lookingForAJobDescription: null,
    fullName: null,
    userId: null,
    photos: {
      small: null,
      large: null,
    },
  },
  entityStatus: EntityStatus.idle,
  status: null,
};

export type UserProfileReducerActionsType =
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setUserProfileEntityStatus>
  | ReturnType<typeof setUserStatus>;

export const userProfileReducer = (
  state: UserProfileReducerStateType = initialState,
  action: UserProfileReducerActionsType,
): UserProfileReducerStateType => {
  switch (action.type) {
    case 'SET-USER-PROFILE':
      return {
        ...state,
        profileData: { ...action.profileData },
      };
    case 'SET-USER-PROFILE-ENTITY-STATUS':
      return { ...state, entityStatus: action.status };
    case 'SET-USER-STATUS':
      return { ...state, status: action.statusText };
    default:
      return state;
  }
};

export const setUserProfile = (profileData: GetUserProfileResponseType) =>
  ({
    type: 'SET-USER-PROFILE',
    profileData,
  } as const);

export const setUserProfileEntityStatus = (status: EntityStatus) =>
  ({
    type: 'SET-USER-PROFILE-ENTITY-STATUS',
    status,
  } as const);

export const setUserStatus = (statusText: string) =>
  ({
    type: 'SET-USER-STATUS',
    statusText,
  } as const);
