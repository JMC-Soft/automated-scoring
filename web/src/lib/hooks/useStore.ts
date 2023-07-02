import { useState, useEffect } from 'react';

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;

  const initialState = Array.isArray(result)
    ? (Array(result.length).fill(undefined) as F)
    : (undefined as F);

  const [data, setData] = useState<F>(initialState);

  useEffect(
    () => {
      setData(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(result) ? result : [result],
  );

  return data;
};

export default useStore;
