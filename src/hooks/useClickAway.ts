import { RefObject, useEffect, useRef } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: () => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    const handler = (event: Event) => {
      const { current: el } = ref;
      el && !el.contains(event.target as Node) && savedCallback.current();
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handler);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [events, ref]);
};

export default useClickAway;
