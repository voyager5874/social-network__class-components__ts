import { axiosInstance, chooseAxiosInstance } from 'api/config';
import {
  BasicResponseType,
  dialogsPostPayloadType,
  GetWithUserDialogResponseType,
  MessageOnServerDataType,
} from 'api/types';
import { InterlocutorType } from 'components/dialogs/types';

export const dialogsAPI = {
  getInterlocutors: () => axiosInstance.get<Array<InterlocutorType>>('dialogs'),
  getNewMessageCount: () => axiosInstance.get<number>('dialogs/messages/new/count'),
  getMessageViewedStatus: () => axiosInstance.get('dialogs/messages/{messageId}/viewed'),
  getWithUserDialog: (userID: number, pageNumber: number, itemsPerPage: number) =>
    axiosInstance.get<GetWithUserDialogResponseType>(
      `dialogs/${userID}/messages?page=${pageNumber}&count=${itemsPerPage}`,
    ),
  putNewChat: (userID: number) =>
    axiosInstance.put<BasicResponseType>(`dialogs/${userID}`),
  postMessageToWithUserDialog: (userID: number, message: string) => {
    const requestBody: dialogsPostPayloadType = {
      body: message,
    };
    return chooseAxiosInstance().post<BasicResponseType<MessageOnServerDataType>>(
      `dialogs/${userID}/messages`,
      requestBody,
    );
  },
};
