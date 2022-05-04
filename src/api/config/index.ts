import axios from 'axios';

import { getFromLocalStorage } from 'utils/localStorageUtils';

const key = process.env.REACT_APP_API_KEY as string;
const testKey = process.env.REACT_APP_TEST_ACCOUNT_API_KEY as string;
const testAccountID = process.env.REACT_APP_TEST_ACCOUNT_ID as string;

const customKey = getFromLocalStorage('customApiKey') || '';
const loggedInUserID = getFromLocalStorage('loggedInUserID');

export const axiosInstanceDev = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    // 'API-KEY': _GIT_PAGES_SECRET_ as string,
    'API-KEY': key,
  },
});

export const axiosInstanceTest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'API-KEY': testKey,
  },
});

export const axiosInstanceCustom = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'API-KEY': customKey,
  },
});

export const chooseAxiosInstance = (): typeof axiosInstanceDev => {
  // console.dir(axiosInstanceDev.defaults.headers);
  // console.dir(axiosInstanceTest.defaults.headers);
  // console.dir(axiosInstanceCustom);
  // debugger;
  if (customKey) {
    return axiosInstanceCustom;
  }
  debugger;
  if (testAccountID && loggedInUserID && loggedInUserID === testAccountID) {
    return axiosInstanceTest;
  }
  return axiosInstanceDev;
};

export const axiosInstance = chooseAxiosInstance();
