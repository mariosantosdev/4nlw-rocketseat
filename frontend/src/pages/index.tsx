import Head from 'next/head'

import CompletedChallenge from '../components/CompletedChallenge'
import CountDown from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início - Move.it</title>
      </Head>
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenge />
          <CountDown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
