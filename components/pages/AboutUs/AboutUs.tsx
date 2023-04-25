import React from 'react'

// Stores, utils, libs
import Image from 'next/image'
import shamil from 'public/shamil.jpg'

// CSS
import styles from './AboutUs.module.sass'

export default function AboutUs() {
  return (
	<div className={styles.aboutUs_page}>
		<div className={styles.content}>
			<h2>
				This is the project of Abdullin Shamil, who just interested in art
			</h2>
			<Image src={shamil} alt='Shamil' height={500} className={styles.image}/>
		</div>
	</div>
  )
}
