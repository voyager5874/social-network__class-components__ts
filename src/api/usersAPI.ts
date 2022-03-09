import { axiosInstance } from 'api/config';
import { GetUsersResponseType } from 'api/types';

export const usersAPI = {
  getUsers(pageNumber: number, usersPerPage: number) {
    return axiosInstance.get<GetUsersResponseType>(
      `users?page=${pageNumber}&count=${usersPerPage}`,
    );
  },
};
