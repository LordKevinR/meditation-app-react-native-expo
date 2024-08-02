import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ITimerContext {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
}

export const TimerContext = createContext<ITimerContext>({
  duration: 10,
  setDuration: () => {},
});

interface ITimerProviderProps {
  children: ReactNode;
}

const TimerProvider = ({ children }: ITimerProviderProps) => {
  const [duration, setDuration] = useState(10);

  return (
    <TimerContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
