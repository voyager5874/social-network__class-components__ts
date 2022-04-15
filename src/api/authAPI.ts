import { axiosInstance } from 'api/config';
import {
  GetCaptchaResponseType,
  AuthMeResponseDataType,
  BasicResponseType,
  LoginDataType,
} from 'api/types';

export const authAPI = {
  authMe() {
    // eslint-disable-next-line no-console
    console.log(axiosInstance.defaults.headers);
    debugger;
    return axiosInstance.get<BasicResponseType<AuthMeResponseDataType>>('auth/me');
  },
  login(data: LoginDataType) {
    return axiosInstance.post<BasicResponseType<{ userId: number }>>('auth/login', data);
  },
  logout() {
    return axiosInstance.delete<BasicResponseType>('auth/login');
  },
  getCaptcha() {
    return axiosInstance
      .get<GetCaptchaResponseType>('security/get-captcha-url')
      .then(response => response.data);
  },
};
