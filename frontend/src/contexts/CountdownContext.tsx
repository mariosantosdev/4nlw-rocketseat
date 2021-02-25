import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengeContext";
export const CountdownContext = createContext({} as CountdownContextData);

export interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  actions: {
    handleStartCountdown: () => void;
    handleResetCountdown: () => void;
  };
}

interface CountdownProviderProps {
  children?: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const {
    actions: { startNewChallenge },
  } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function handleStartCountdown() {
    setIsActive(true);
  }

  function handleResetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        hasFinished,
        isActive,
        minutes,
        seconds,
        actions: {
          handleStartCountdown,
          handleResetCountdown,
        },
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
