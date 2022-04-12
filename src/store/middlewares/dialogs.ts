import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { dialogsAPI } from 'api/dialogsAPI';
import { ResponseCodes } from 'enums';
import { setInterlocutors } from 'store/reducers/interlocutorsReducer';
import { setWithUserMessages } from 'store/reducers/messagesReducer';

export const getInterlocutors = () => async (dispatch: Dispatch) => {
  try {
    const response = await dialogsAPI.getInterlocutors();
    debugger;
    if (response.data) {
      dispatch(setInterlocutors(response.data));
    } else {
      // eslint-disable-next-line no-alert
      alert('no interlocutors');
    }
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert((error as AxiosError).message);
  }
};

export const getWithUserMessages =
  (userID: number, pageNumber: number = 1, itemsPerPage: number = 20) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await dialogsAPI.getWithUserDialog(
        userID,
        pageNumber,
        itemsPerPage,
      );
      if (response.data.items) {
        debugger;
        dispatch(setWithUserMessages(response.data.items));
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert((error as AxiosError).message);
    }
  };

export const sendMessage = (userID: number, message: string) => async (dispatch: any) => {
  debugger;

  try {
    const response = await dialogsAPI.postMessageToWithUserDialog(userID, message);
    if (response.data.resultCode === ResponseCodes.Success) {
      // eslint-disable-next-line no-alert
      alert(`Sent! recipient: ${response.data.data.message.recipientName}`);
      dispatch(getWithUserMessages(userID));
    }
    console.dir(response);
  } catch (error) {
    console.log((error as AxiosError).message);
  }
};

export const startNewChat = (userID: number) => async (dispatch: Dispatch) => {
  try {
    const response = await dialogsAPI.putNewChat(userID);
    debugger;
    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.log((error as AxiosError).message);
  }
};
