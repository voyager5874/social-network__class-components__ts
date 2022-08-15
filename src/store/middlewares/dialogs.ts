import { message } from 'antd';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { dialogsAPI } from 'api/dialogsAPI';
import { InterlocutorType } from 'components/dialogs/types';
import { FIRST_ARRAY_ITEM_INDEX } from 'constants/base';
import { ResponseCodes } from 'enums';
import { setAppEntityStatus } from 'store/reducers/app';
import { setInterlocutors } from 'store/reducers/interlocutorsReducer';
import {
  addMoreWithUserMessages,
  setMessagesCurrentPage,
  setMessagesEntityStatus,
  setWithUserMessages,
  setWithUserMessagesTotalCount,
} from 'store/reducers/messagesReducer';
import { EntityStatus } from 'store/reducers/types';
import { AppActionsType, AppDispatchType, RootStateType } from 'store/types';

export const getInterlocutors =
  () =>
  async (dispatch: Dispatch<AppActionsType>): Promise<InterlocutorType[] | []> => {
    dispatch(setAppEntityStatus(EntityStatus.busy));
    try {
      const response = await dialogsAPI.getInterlocutors();
      if (response.data.length) {
        // debugger;
        dispatch(setInterlocutors(response.data));
        return response.data;
      }
      // eslint-disable-next-line no-alert
      // alert('no interlocutors');
      return [];
    } catch (error) {
      message.error((error as AxiosError).message);
      return [];
    } finally {
      dispatch(setAppEntityStatus(EntityStatus.idle));
    }
  };

export const getWithUserMessages =
  (userID: number, pageNumber: number = 1, itemsPerPage: number = 10) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    // dispatch(setAppEntityStatus(EntityStatus.busy));
    dispatch(setMessagesEntityStatus(EntityStatus.busy));
    const sameUser: boolean = getState().messages.currentInterlocutorID === userID;
    const { currentPage } = getState().messages; // why?
    const isNewPageRequest: boolean = currentPage < pageNumber;
    try {
      const response = await dialogsAPI.getWithUserDialog(
        userID,
        pageNumber,
        itemsPerPage,
      );
      if (response.data.items) {
        if (sameUser && isNewPageRequest) {
          dispatch(addMoreWithUserMessages(response.data.items));
          dispatch(setMessagesCurrentPage(currentPage + 1));
          dispatch(setMessagesEntityStatus(EntityStatus.expansion));
        } else {
          // @ts-ignore
          dispatch(setWithUserMessagesTotalCount(response.data.totalCount));
          dispatch(setMessagesCurrentPage(1));
          dispatch(setWithUserMessages(response.data.items));
          dispatch(setMessagesEntityStatus(EntityStatus.initialization));
        }
        await dispatch(getInterlocutors()); // reset new messages count, the alternative would be to just set 0 to the store
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert((error as AxiosError).message);
    }
    // dispatch(setAppEntityStatus(EntityStatus.idle));
    dispatch(setMessagesEntityStatus(EntityStatus.idle));
  };

export const sendMessage =
  (userID: number, message: string) => async (dispatch: AppDispatchType) => {
    try {
      const response = await dialogsAPI.postMessageToWithUserDialog(userID, message);
      if (response.data.resultCode === ResponseCodes.Success) {
        // eslint-disable-next-line no-alert
        alert(`Sent! recipient: ${response.data.data.message.recipientName}`);
        await dispatch(getWithUserMessages(userID));
        await dispatch(getInterlocutors());
      } else {
        console.dir(response);
      }
    } catch (error) {
      console.log((error as AxiosError).message);
    }
  };

export const startNewChat =
  (userID: number) =>
  async (dispatch: AppDispatchType): Promise<boolean> => {
    try {
      const response = await dialogsAPI.putNewChat(userID);
      if (response.data.resultCode === ResponseCodes.Success) {
        const interlocutorsList: InterlocutorType[] = await dispatch(getInterlocutors());
        return interlocutorsList[FIRST_ARRAY_ITEM_INDEX].id === userID;
      }
      console.warn(response.data.messages[FIRST_ARRAY_ITEM_INDEX]);
      return false;
    } catch (error) {
      console.warn((error as AxiosError).message);
      return false;
    }
  };
