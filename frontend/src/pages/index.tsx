import Head from "next/head";
import { GetServerSideProps } from 'next'

import { ChallengesProvider } from "../contexts/ChallengeContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import ChallengeBox from "../components/ChallengeBox";
import CompletedChallenge from "../components/CompletedChallenge";
import CountDown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import styles from "../styles/Home.module.css";

interface HomeProps {
    level: number
    currentXp: number
    challengesCompleted: number
}

export default function Home(props: HomeProps) {
    return (
        <ChallengesProvider
            level={props.level}
            currentXp={props.currentXp}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <Head>
                    <title>Início - Move.it</title>
                </Head>
                <ExperienceBar />
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenge />
                            <CountDown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { level, currentXp, challengesCompleted } = ctx.req.cookies
    const user = {
        level: Number(level),
        currentXp: Number(currentXp),
        challengesCompleted: Number(challengesCompleted)
    }

    return {
        props: user
    }
}