import axios from 'axios';

const key = process.env.REACT_APP_API_KEY as string;
const testKey = process.env.REACT_APP_TEST_ACCOUNT_API_KEY as string;
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    // 'API-KEY': process.env.REACT_APP_API_KEY as string,
    // 'API-KEY': process.env.REACT_APP_TEST_ACCOUNT_API_KEY as string,
    // 'API-KEY': _GIT_PAGES_SECRET_ as string,

    'API-KEY':
      // @ts-ignore
      window.loggedInUserID === 23352 ? testKey : key,
  },
});
