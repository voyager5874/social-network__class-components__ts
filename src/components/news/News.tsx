import { useState } from 'react';

import { useDispatch } from 'react-redux';

import styles from './News.module.css';

import { UniversalButton } from 'components/common/universalButton/UniversalButton';
import { sendMessage } from 'store/middlewares/dialogs';
import { ComponentReturnType } from 'types';

export const News = (): ComponentReturnType => {
  const [inputValue, setInputValue] = useState('');
  const [messageText, setMessageText] = useState('');
  const componentName = 'News';
  const dispatch = useDispatch();

  const sendMessageTest = () => {
    const idAsNumber = Number(inputValue);
    dispatch(sendMessage(idAsNumber, messageText));
  };

  return (
    <div className={styles.news}>
      <input
        placeholder="user id"
        type="number"
        value={inputValue}
        onChange={e => setInputValue(e.currentTarget.value)}
      />
      <textarea
        placeholder="message"
        value={messageText}
        onChange={e => setMessageText(e.currentTarget.value)}
      />
      <div>{componentName}</div>
      <UniversalButton onClick={sendMessageTest}>Message?</UniversalButton>
    </div>
  );
};
