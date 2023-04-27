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
			<Image src={shamil} alt='Shamil' height={250} className={styles.image}/>
			<h3>
				It is site for artists and those who interested in art to watch and navigate in the world of art
			</h3>
		</div>
	</div>
  )
}
