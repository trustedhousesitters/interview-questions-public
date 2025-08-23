import { useRef, useCallback } from "react";

const useDebounce = (waitTime) => {
  const timeout = useRef();

  return useCallback(
    (callback) => {
      timeout.current = setTimeout(() => {
        clearTimeout(timeout.current);
        callback();
      }, waitTime);

      return () => {
        if (timeout.current) clearTimeout(timeout.current);
      };
    },
    [waitTime]
  );
};

export default useDebounce;
