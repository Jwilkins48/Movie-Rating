import { useState } from "react";

function useLocalStorage(key: string, initialValue: never[]) {
  const [localStorageValue, setLocalStorageValue] = useState(() =>
    getLocalStorageValue(key, initialValue)
  );
  const setValue = (value: never[]) => {
    //check if function
    const valueToStore =
      value instanceof Function ? value(localStorageValue) : value;
    //set to state
    setLocalStorageValue(value);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  return [localStorageValue, setValue];
}

function getLocalStorageValue(key: string, initialValue: never[]) {
  const itemFromStorage = localStorage.getItem(key);
  return itemFromStorage ? JSON.parse(itemFromStorage) : initialValue;
}

export default useLocalStorage;
