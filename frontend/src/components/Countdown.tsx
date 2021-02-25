import React, { ReactNode, useContext, useEffect, useState } from "react";
import { CountdownContext } from "../contexts/CountdownContext";

import styles from "./styles/Countdown.module.css";

interface CountDownProps {
  children?: ReactNode;
}

function CountDown(props: CountDownProps) {
  const {
    actions: { handleStartCountdown, handleResetCountdown },
    isActive,
    hasFinished,
    minutes,
    seconds,
  } = useContext(CountdownContext);

  const [firstMinute, lastMinute] = String(minutes).padStart(2, "0").split("");
  const [firstSeconds, lastSeconds] = String(seconds)
    .padStart(2, "0")
    .split("");

  return (
    <React.Fragment>
      <div className={styles.countdown_cointainer}>
        <div>
          <span>{firstMinute}</span>
          <span>{lastMinute}</span>
        </div>
        <span>:</span>
        <div>
          <span>{firstSeconds}</span>
          <span>{lastSeconds}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled className={styles.countdown_button}>
          Ciclo encerrado
        </button>
      ) : (
        <React.Fragment>
          {isActive ? (
            <button
              type="button"
              onClick={handleResetCountdown}
              className={`${styles.countdown_button} ${styles.countdown_button_active}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStartCountdown}
              className={styles.countdown_button}
            >
              Iniciar ciclo
            </button>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default CountDown;
