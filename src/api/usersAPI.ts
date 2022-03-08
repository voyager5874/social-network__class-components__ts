import { axiosInstance } from 'api/config';
import { getUsersResponseType } from 'api/types';

export const usersAPI = {
  getUsers() {
    return axiosInstance.get<getUsersResponseType>('users');
  },
};
