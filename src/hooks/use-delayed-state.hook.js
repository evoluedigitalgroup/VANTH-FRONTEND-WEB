import { useState, useEffect, useRef } from 'react';

export function useDelayedState(initialValue, delay = 300) {
  const [state, setState] = useState(initialValue);
  const [delayedState, setDelayedState] = useState(initialValue);

  const timeoutRef = useRef(null);
  const latestStateRef = useRef(state);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    latestStateRef.current = state;

    timeoutRef.current = setTimeout(() => {
      setDelayedState(latestStateRef.current);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [state, delay]);

  return [state, setState, delayedState];
}