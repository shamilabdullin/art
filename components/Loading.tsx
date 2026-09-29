import React from 'react'
import dynamic from 'next/dynamic'
import styles from './styles/Loading.module.sass'
import loading from 'public/loading1.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export const Loading = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading}>
        <Lottie animationData={loading}></Lottie>
      </div>
    </div>
  )
}
