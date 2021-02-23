import React, { ReactNode, useEffect, useState } from 'react'

import styles from './styles/Countdown.module.css'

interface CountDownProps {
    children?: ReactNode
}

function CountDown(props: CountDownProps) {
    const [time, setTime] = useState(25 * 60)
    const [active, setActive] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [firstMinute, lastMinute] = String(minutes).padStart(2, '0').split('')
    const [firstSeconds, lastSeconds] = String(seconds).padStart(2, '0').split('')

    function handleStartCountdown() {
        setActive(true)
    }

    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
    }, [active, time])

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
            <button
                type="button"
                onClick={handleStartCountdown}
                className={styles.countdown_button}
            >
                Iniciar ciclo
            </button>
        </React.Fragment>
    )
}

export default CountDown