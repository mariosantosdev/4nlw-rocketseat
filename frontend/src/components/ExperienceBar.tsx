import React, { ReactNode, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'

import styles from './styles/ExperienceBar.module.css'

interface ExperienceBarProps {
    children?: ReactNode
}

function ExperienceBar(props: ExperienceBarProps) {
    const {
        currentXp,
        xpToNextLevel
    } = useContext(ChallengesContext)

    const percentToNextLevel = Math.round(currentXp * 100) / xpToNextLevel || 0

    return (
        <header className={styles.experience_bar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                {
                    percentToNextLevel > 0 && percentToNextLevel < 100 && (
                        <span className={styles.current_exp} style={{ left: `${percentToNextLevel}%` }}>{currentXp} xp</span>
                    )
                }
            </div>
            <span>{xpToNextLevel} xp</span>
        </header>
    )
}

export default ExperienceBar