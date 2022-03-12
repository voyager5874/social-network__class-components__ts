import { GetUserProfileResponseType } from 'api/types';
import { UserProfileReducerStateType } from 'store/reducers/types';

const initialState: UserProfileReducerStateType = {
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
};

export type UserProfileReducerActionsType = ReturnType<typeof setUserProfile>;

export const userProfileReducer = (
  state: UserProfileReducerStateType = initialState,
  action: UserProfileReducerActionsType,
): UserProfileReducerStateType => {
  switch (action.type) {
    case 'SET-USER-PROFILE':
      return { ...action.profileData };
    default:
      return state;
  }
};

export const setUserProfile = (profileData: GetUserProfileResponseType) =>
  ({
    type: 'SET-USER-PROFILE',
    profileData,
  } as const);
