import { axiosInstance } from 'api/config';
import { AuthMeResponseType } from 'api/types';

export const authAPI = {
  authMe() {
    return axiosInstance.get<AuthMeResponseType>('auth/me');
  },
};
