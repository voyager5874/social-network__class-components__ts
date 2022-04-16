import { axiosInstance, chooseAxiosInstance } from 'api/config';
import {
  BasicResponseType,
  GetUserProfileResponseType,
  GetUsersResponseType,
  PutProfilePhotoResponseDataType,
  UpdateUserProfileRequestDataType,
} from 'api/types';
import { Nullable } from 'types';

export const usersAPI = {
  getUsers: (pageNumber: number, usersPerPage: number) =>
    axiosInstance.get<GetUsersResponseType>(
      `users?page=${pageNumber}&count=${usersPerPage}`,
    ),
  getUserProfile: (userID: number | string) =>
    axiosInstance.get<GetUserProfileResponseType>(`profile/${userID}`),
  followUser: (userID: number | string) =>
    axiosInstance.post<BasicResponseType>(`follow/${userID}`),
  unfollowUser: (userID: number | string) =>
    axiosInstance.delete<BasicResponseType>(`follow/${userID}`),
  checkIfUserFollowedByCurrentUser(userID: number | string) {
    return axiosInstance.get<boolean>(`follow/${userID}`);
  },
  getUserStatus: (userID: number | string) =>
    axiosInstance.get<Nullable<string>>(`profile/status/${userID}`),
  updateCurrentUserStatus: (statusText: string) =>
    chooseAxiosInstance().put<BasicResponseType>('profile/status', {
      status: `${statusText}`,
    }),
  putNewCurrentUserProfileData: (data: Partial<UpdateUserProfileRequestDataType>) =>
    chooseAxiosInstance().put<BasicResponseType>('profile', data),
  putProfilePhoto: (imgFile: File) => {
    const formData = new FormData();
    formData.append('image', imgFile);
    return chooseAxiosInstance().put<BasicResponseType<PutProfilePhotoResponseDataType>>(
      '/profile/photo',
      formData,
    );
  },
  getFriendsList: (pageNumber: number = 1, usersPerPage: number = 10) =>
    axiosInstance.get<GetUsersResponseType>(
      `users?friend=true&page=${pageNumber}&count=${usersPerPage}`,
    ),
};
