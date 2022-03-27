import { axiosInstance } from 'api/config';
import {
  BasicResponseType,
  GetUserProfileResponseType,
  GetUsersResponseType,
  PutProfilePhotoResponseDataType,
  UpdateUserProfileRequestDataType,
  UserOnServerType,
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
    axiosInstance.put<BasicResponseType>('profile/status', {
      status: `${statusText}`,
    }),
  putNewCurrentUserProfileData: (data: Partial<UpdateUserProfileRequestDataType>) =>
    axiosInstance.put<BasicResponseType>('profile', data),
  putProfilePhoto: (imgFile: File) => {
    const formData = new FormData();
    formData.append('image', imgFile);
    return axiosInstance.put<BasicResponseType<PutProfilePhotoResponseDataType>>(
      '/profile/photo',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  },
  getFriendsList: () => axiosInstance.get<GetUsersResponseType>(`users?friend=true`),
};
