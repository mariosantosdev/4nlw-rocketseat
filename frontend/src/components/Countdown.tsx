import React, { ReactNode, useEffect, useState } from 'react'

import styles from './styles/Countdown.module.css'

interface CountDownProps {
    children?: ReactNode
}

let countdownTimeout: NodeJS.Timeout

function CountDown(props: CountDownProps) {
    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [firstMinute, lastMinute] = String(minutes).padStart(2, '0').split('')
    const [firstSeconds, lastSeconds] = String(seconds).padStart(2, '0').split('')

    function handleStartCountdown() {
        setIsActive(true)
    }

    function handleRestCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(0.05 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
        }
    }, [isActive, time])

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
            {hasFinished
                ? (
                    <button
                        disabled
                        className={styles.countdown_button}
                    >
                        Ciclo encerrado
                    </button>
                )
                : (
                    <React.Fragment>
                        {isActive
                            ? (
                                <button
                                    type="button"
                                    onClick={handleRestCountdown}
                                    className={`${styles.countdown_button} ${styles.countdown_button_active}`}
                                >
                                    Abandonar ciclo
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleStartCountdown}
                                    className={styles.countdown_button}
                                >
                                    Iniciar ciclo
                                </button>
                            )
                        }
                    </React.Fragment>
                )

            }
        </React.Fragment>
    )
}

export default CountDown