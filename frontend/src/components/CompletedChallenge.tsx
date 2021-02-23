import React, { ReactNode } from 'react'

import styles from './styles/CompletedChallenge.module.css'

interface CompletedChallengeProps {
    children?: ReactNode
}

function CompletedChallenge(props: CompletedChallengeProps) {
    return (
        <div className={styles.completed_challenge_container}>
            <span>Desafios completos</span>
            <span>6</span>
        </div>
    )
}

export default CompletedChallenge