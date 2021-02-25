import React, { ReactNode, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";

import styles from "./styles/ChallengeBox.module.css";

interface ChallengeBoxProps {
  children?: ReactNode;
}

function ChallengeBox(props: ChallengeBoxProps) {
  const {
    actions: { resetChallenge, completeChallenge },
    activeChallenge,
  } = useContext(ChallengesContext);

  return (
    <div className={styles.challenge_box_container}>
      {activeChallenge ? (
        <div className={styles.challenge_active}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafios</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={resetChallenge}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSuccessedButton}
              onClick={completeChallenge}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challenge_not_active}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}

export default ChallengeBox;
