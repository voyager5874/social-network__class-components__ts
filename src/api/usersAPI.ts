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
  getUsers(pageNumber: number, usersPerPage: number) {
    return axiosInstance.get<GetUsersResponseType>(
      `users?page=${pageNumber}&count=${usersPerPage}`,
    );
  },
  getUserProfile(userID: number | string) {
    return axiosInstance.get<GetUserProfileResponseType>(`profile/${userID}`);
  },
  followUser(userID: number | string) {
    return axiosInstance.post<FollowUserResponseType>(`follow/${userID}`);
  },
  unfollowUser(userID: number | string) {
    return axiosInstance.delete<UnfollowUserResponseType>(`follow/${userID}`);
  },
  checkIfUserFollowedByCurrentUser(userID: number | string) {
    return axiosInstance.get<boolean>(`follow/${userID}`);
  },
  getUserStatus(userID: number | string) {
    return axiosInstance.get<Nullable<string>>(`profile/status/${userID}`);
  },
  updateCurrentUserStatus(statusText: string) {
    return axiosInstance.put<BasicResponseType>('profile/status', {
      status: `${statusText}`,
    });
  },
  updateCurrentUserProfileData(data: UpdateUserProfileRequestDataType) {
    return axiosInstance.put<BasicResponseType>('profile', data);
  },
};
