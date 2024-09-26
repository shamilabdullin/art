import React from 'react'
import styles from './styles/Loading.module.sass'
import loading from 'public/loading1.json'
import Lottie from 'lottie-react'

export const Loading = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading}>
        <Lottie animationData={loading}></Lottie>
      </div>
    </div>
  )
}
