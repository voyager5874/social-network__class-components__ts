import axios from 'axios';

const key = process.env.REACT_APP_API_KEY as string;
const testKey = process.env.REACT_APP_TEST_ACCOUNT_API_KEY as string;
const testAccountID = Number(process.env.REACT_APP_TEST_ACCOUNT_ID as string);

const localStorageData = localStorage.getItem('it-inc-network');
const savedState = localStorageData && JSON.parse(localStorageData);
const customKey = savedState && savedState.customApiKey;
const loggedInUserID = savedState && Number(savedState.loggedInUserID);

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
  if (testAccountID && loggedInUserID === testAccountID) {
    return axiosInstanceTest;
  }
  return axiosInstanceDev;
};

export const axiosInstance = chooseAxiosInstance();
