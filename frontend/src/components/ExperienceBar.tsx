import React, { ReactNode } from 'react'

import styles from './styles/ExperienceBar.module.css'

interface ExperienceBarProps {
    children?: ReactNode
}

function ExperienceBar(props: ExperienceBarProps) {
    return (
        <header className={styles.experience_bar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: '60%' }} />
                <span className={styles.current_exp} style={{ left: '60%' }}>360 xp</span>
            </div>
            <span>600 xp</span>
        </header>
    )
}

export default ExperienceBar