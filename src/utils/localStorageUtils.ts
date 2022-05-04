import { Nullable } from 'types';

const PATH = 'it-inc-network';

type AppDataType = {
  customApiKey: string;
  loggedInUserID: string;
};

export const localStorageUtils = {
  save() {},
  read() {},
  update() {},
  delete() {},
};

export const getFromLocalStorage = (entry: keyof AppDataType): string | null => {
  const serializedAppData = localStorage.getItem(PATH);
  if (serializedAppData) {
    const dataObject = JSON.parse(serializedAppData);
    if (dataObject[entry]) {
      return String(dataObject[entry]);
    }
  }
  return null;
};

export const addDataToLocalStorage = (
  entry: keyof AppDataType,
  newData: Nullable<string | number>,
): void => {
  if (!newData) return;
  const currentSerializedAppData = localStorage.getItem(PATH);
  if (currentSerializedAppData) {
    const currentAppDataObject = JSON.parse(currentSerializedAppData);
    const newSerializedAppData = JSON.stringify({
      ...currentAppDataObject,
      [entry]: newData,
    });
    localStorage.setItem(PATH, newSerializedAppData);
  } else {
    const newSerializedAppData = JSON.stringify({ [entry]: newData });
    localStorage.setItem(PATH, newSerializedAppData);
  }
};

export const deleteAppDataFromLocalStorage = (): void => {
  localStorage.removeItem(PATH);
};
