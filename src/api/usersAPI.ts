import { axiosInstance } from 'api/config';
import {
  FollowUserResponseType,
  GetUserProfileResponseType,
  GetUsersResponseType,
  UnfollowUserResponseType,
} from 'api/types';

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
    return axiosInstance.post<FollowUserResponseType>(`/follow/${userID}`);
  },
  unfollowUser(userID: number | string) {
    return axiosInstance.delete<UnfollowUserResponseType>(`/follow/${userID}`);
  },
  checkIfUserFollowed(userID: number | string) {
    return axiosInstance.get<boolean>(`/follow/${userID}`);
  },
};
