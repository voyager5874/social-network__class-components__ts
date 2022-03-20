import { axiosInstance } from 'api/config';
import { AuthMeResponseType, BasicResponseType, LoginDataType } from 'api/types';

export const authAPI = {
  authMe() {
    // return axiosInstance.get<AuthMeResponseType>('auth/me');
    return axiosInstance.get<AuthMeResponseType>('auth/me');
  },
  login(data: LoginDataType) {
    return axiosInstance.post<BasicResponseType<{ userId: number }>>('auth/login', data);
  },
  logout() {
    return axiosInstance.delete<BasicResponseType>('auth/login');
  },
};
