import { useEffect, useRef } from "react";

// Inspired by https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useAutoAdvance = (onAdvance, interval, enabled) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = onAdvance;
  }, [onAdvance]);

  useEffect(() => {
    // Cancel automatic cycling of slides if prefersReducedMotion
    if (!enabled) {
      return;
    }

    // Fresh instance of the provided callback
    const tick = () => {
      savedCallback.current();
    };

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, enabled]);
};

export default useAutoAdvance;
