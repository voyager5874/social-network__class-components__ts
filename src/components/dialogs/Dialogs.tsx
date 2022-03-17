import { ChangeEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './Dialogs.module.css';

import { Dialog } from 'components/dialogs/dialog/Dialog';
import { Interlocutor } from 'components/dialogs/interlocutor/Interlocutor';
import { InterlocutorType } from 'components/dialogs/types';
import { addMessageAC, updateNewMessageTextAC } from 'store/reducers/messagesReducer';
import { MonicaID } from 'store/stubData';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

export const Dialogs = (): ComponentReturnType => {
  const people = useSelector<RootStateType, InterlocutorType[]>(
    state => state.interlocutors,
  );
  const newMessage = useSelector<RootStateType, string>(
    state => state.messages.newMessageBody,
  );
  const dispatch = useDispatch();
  const { interlocutorID } = useParams();
  const handleNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const action = updateNewMessageTextAC(event.currentTarget.value);
    dispatch(action);
  };
  const handleSendMessage = (): void => {
    dispatch(addMessageAC(MonicaID));
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.peopleList}>
        {people.map(({ name, id }) => (
          <Interlocutor key={id} name={name} id={id} />
        ))}
      </div>

      <div className={styles.messagesContainer}>
        <Dialog interlocutorID={interlocutorID || MonicaID} />
        <div>
          <textarea onChange={handleNewMessageChange} value={newMessage} />
          <button type="submit" onClick={handleSendMessage}>
            send message
          </button>
        </div>
      </div>
    </div>
  );
};
