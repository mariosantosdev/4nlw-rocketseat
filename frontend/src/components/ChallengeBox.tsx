import React, { ReactNode } from 'react'

import styles from './styles/ChallengeBox.module.css'

interface ChallengeBoxProps {
    children?: ReactNode
}

function ChallengeBox(props: ChallengeBoxProps) {
    const hasChallenge = true

    return (
        <div className={styles.challenge_box_container}>
            { hasChallenge ?
                (
                    <div className={styles.challenge_active}>
                        <header>Ganhe 400 xp</header>
                        <main>
                            <img src="icons/body.svg" alt="" />
                            <strong>Novo desafios</strong>
                            <p>Faça uma caminhada de 3min</p>
                        </main>
                        <footer>
                            <button
                                type="button"
                                className={styles.challengeFailedButton}
                                onClick={() => { }}
                            >
                                Falhei
                            </button>
                            <button
                                type="button"
                                className={styles.challengeSuccessedButton}
                                onClick={() => { }}
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
                )
            }
        </div>
    )
}

export default ChallengeBox