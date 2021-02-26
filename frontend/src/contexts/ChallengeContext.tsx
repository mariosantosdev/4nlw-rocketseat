import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import challenges from "../../challenges.json";
import LevelUpModal from "../components/LevelUpModal";

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengeProps {
    type: string;
    description: string;
    amount: number;
}

export interface ChallengesContextData {
    level: number;
    xpToNextLevel: number;
    currentXp: number;
    challengesCompleted: number;
    activeChallenge: ChallengeProps | null;
    actions: {
        levelUp: () => void;
        startNewChallenge: () => void;
        resetChallenge: () => void;
        completeChallenge: () => void;
        handleLevelModal: () => void;
    };
}

interface ChallengesProviderProps {
    children?: ReactNode;
    level: number
    currentXp: number
    challengesCompleted: number
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [isShowLevelModal, setIsShowLevelModal] = useState(false)
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState<ChallengeProps | null>(
        null
    );

    const xpToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentXp', String(currentXp))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentXp, challengesCompleted])

    function startNewChallenge() {
        const randomChallenge = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallenge];

        setActiveChallenge(challenge);

        new Audio("/notification.mp3").play();

        if (Notification.permission === "granted") {
            new Notification("Novo desafio 🚀", {
                body: `Valendo ${challenge.amount}xp!`,
                icon: "/favicon.png",
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) return;

        const { amount } = activeChallenge;
        let finalXp = currentXp + amount;

        if (finalXp >= xpToNextLevel) {
            finalXp = finalXp - xpToNextLevel;
            levelUp();
        }

        setCurrentXp(finalXp);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function levelUp() {
        setLevel(level + 1);
        handleLevelModal()
    }

    function handleLevelModal() {
        setIsShowLevelModal(!isShowLevelModal)
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
                    resetChallenge,
                    completeChallenge,
                    handleLevelModal
                },
            }}
        >
            {isShowLevelModal && <LevelUpModal />}
            {children}
        </ChallengesContext.Provider>
    );
}
