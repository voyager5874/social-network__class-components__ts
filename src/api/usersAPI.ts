import { axiosInstance } from 'api/config';
import {
  BasicResponseType,
  FollowUserResponseType,
  GetUserProfileResponseType,
  GetUsersResponseType,
  UnfollowUserResponseType,
  UpdateUserProfileRequestDataType,
  UserOnServerType,
} from 'api/types';
import { Nullable } from 'types';

export const usersAPI = {
  getUsers: (pageNumber: number, usersPerPage: number) =>
    axiosInstance.get<GetUsersResponseType>(
      `users?page=${pageNumber}&count=${usersPerPage}`,
    ),
  getUserProfile: (userID: number | string) =>
    axiosInstance.get<GetUserProfileResponseType>(`profile/${userID}`),
  followUser: (userID: number | string) =>
    axiosInstance.post<FollowUserResponseType>(`follow/${userID}`),
  unfollowUser: (userID: number | string) =>
    axiosInstance.delete<UnfollowUserResponseType>(`follow/${userID}`),
  checkIfUserFollowedByCurrentUser(userID: number | string) {
    return axiosInstance.get<boolean>(`follow/${userID}`);
  },
  getUserStatus: (userID: number | string) =>
    axiosInstance.get<Nullable<string>>(`profile/status/${userID}`),
  updateCurrentUserStatus: (statusText: string) =>
    axiosInstance.put<BasicResponseType>('profile/status', {
      status: `${statusText}`,
    }),
  updateCurrentUserProfileData: (data: UpdateUserProfileRequestDataType) =>
    axiosInstance.put<BasicResponseType>('profile', data),
};
