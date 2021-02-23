import React, { ReactNode } from 'react'

import styles from './styles/Profile.module.css'

interface ProfileProps {
    children?: ReactNode
}

function Profile(props: ProfileProps) {
    return (
        <div className={styles.profile_container}>
            <img src="https://github.com/nvrsantos.png" alt="Mário Santos" />
            <div>
                <strong>Mário Santos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 3
                </p>
            </div>
        </div>
    )
}

export default Profile