import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const CurrentTimeContext = createContext<number>(Date.now());

export function CurrentTimeProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <CurrentTimeContext.Provider value={now}>
      {children}
    </CurrentTimeContext.Provider>
  );
}

export function useCurrentTime(): number {
  return useContext(CurrentTimeContext);
}
