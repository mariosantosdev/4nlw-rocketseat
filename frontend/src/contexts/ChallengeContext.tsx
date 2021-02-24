import { createContext, ReactNode, useState } from "react";
import challenges from '../../challenges.json'

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengeProps {
    type: string
    description: string
    amount: number
}

export interface ChallengesContextData {
    level: number
    xpToNextLevel: number
    currentXp: number
    challengesCompleted: number
    activeChallenge: ChallengeProps | null
    actions: {
        levelUp: () => void
        startNewChallenge: () => void
        resetChallenge: () => void
    }
}

interface ChallengesProviderProps {
    children?: ReactNode
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentXp, setCurrentXp] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState<ChallengeProps | null>(null)

    const xpToNextLevel = Math.pow((level + 1) * 4, 2)

    function startNewChallenge() {
        const randomChallenge = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallenge]

        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function levelUp() {
        setLevel(level + 1)
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                xpToNextLevel,
                currentXp,
                challengesCompleted,
                activeChallenge,
                actions: {
                    levelUp,
                    startNewChallenge,
                    resetChallenge
                }
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}