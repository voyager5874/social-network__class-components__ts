import { axiosInstance } from 'api/config';
import { GetUserProfileResponseType, GetUsersResponseType } from 'api/types';

export const usersAPI = {
  getUsers(pageNumber: number, usersPerPage: number) {
    debugger;
    return axiosInstance.get<GetUsersResponseType>(
      `users?page=${pageNumber}&count=${usersPerPage}`,
    );
  },
  getUserProfile(userID: number | string) {
    debugger;
    return axiosInstance.get<GetUserProfileResponseType>(`profile/${userID}`);
  },
};
