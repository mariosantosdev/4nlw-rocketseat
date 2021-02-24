import React, { ReactNode, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'

import styles from './styles/Profile.module.css'

interface ProfileProps {
    children?: ReactNode
}

function Profile(props: ProfileProps) {
    const { level } = useContext(ChallengesContext)
    return (
        <div className={styles.profile_container}>
            <img src="https://github.com/nvrsantos.png" alt="Mário Santos" />
            <div>
                <strong>Mário Santos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}

export default Profile