import { axiosInstance } from 'api/config';
import { GetUserProfileResponseType, GetUsersResponseType } from 'api/types';

export const usersAPI = {
  getUsers(pageNumber: number, usersPerPage: number) {
    return axiosInstance.get<GetUsersResponseType>(
      `users?page=${pageNumber}&count=${usersPerPage}`,
    );
  },
  getUserProfile(userID: number | string) {
    return axiosInstance.get<GetUserProfileResponseType>(`profile/${userID}`);
  },
};
