import React, { ReactNode, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'

import styles from './styles/CompletedChallenge.module.css'

interface CompletedChallengeProps {
    children?: ReactNode
}

function CompletedChallenge(props: CompletedChallengeProps) {
    const {
        challengesCompleted
    } = useContext(ChallengesContext)

    return (
        <div className={styles.completed_challenge_container}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}

export default CompletedChallenge