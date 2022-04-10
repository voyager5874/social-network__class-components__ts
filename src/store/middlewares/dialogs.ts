import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { dialogsAPI } from 'api/dialogsAPI';
import { ResponseCodes } from 'enums';
import { setInterlocutors } from 'store/reducers/interlocutorsReducer';
import { setWithUserMessages } from 'store/reducers/messagesReducer';

type dialogsPostPayloadType = {
  body: string;
};

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

export const getWithUserMessages = (userID: number) => async (dispatch: Dispatch) => {
  try {
    const response = await dialogsAPI.getWithUserDialog(userID);
    if (response.data.totalCount) {
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
