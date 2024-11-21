import { useCallback, useRef } from "react";
import { debounce } from "../utils/debounce";

const useDebounce = (callback, delay) => {
  const debouncedCallback = useRef();

  // Create a debounced version of the callback
  if (!debouncedCallback.current) {
    debouncedCallback.current = debounce(callback, delay);
  }

  return useCallback(
    (...args) => {
      debouncedCallback.current(...args);
    },
    [callback, delay]
  );
};

export default useDebounce;
