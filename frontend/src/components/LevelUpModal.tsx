import React, { ReactNode, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'

import styles from './styles/LevelUpModal.module.css'

interface LevelUpModalProps {
    children?: ReactNode
}

function LevelUpModal(props: LevelUpModalProps) {
    const { level, actions: { handleLevelModal } } = useContext(ChallengesContext)
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button
                    type="button"
                    onClick={handleLevelModal}
                >
                    <img src="/icons/close.svg" alt="Fechar Modal" />
                </button>
            </div>
        </div>
    )
}

export default LevelUpModal