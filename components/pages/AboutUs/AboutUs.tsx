import React from 'react'

// Stores, utils, libs
import Image from 'next/image'
import shamil from 'public/shamil.jpg'

// CSS
import styles from './AboutUs.module.sass'

export default function AboutUs():JSX.Element {
  return (
	<div className={styles.aboutUs_page}>
		<div className={styles.content}>
			<div className={styles.container}>
				<Image src={shamil} alt='Shamil' className={styles.image}/>
			</div>
			<div className={styles.article}>
				<p>
					Hello, my name is Abdullin Shamil, and this site is my project.
				</p>
				<p>
					I use collection from database of the Art Institite of Chicago.
				</p>
				<p>
					I create it for artists and those, who interested in art.
				</p>
				<p>
					I hope you will enjoy it.
				</p>
				<p style={{'marginTop' : '24px'}}>
					<strong>
						Github project link <a href="https://github.com/shamilabdullin/art">https://github.com/shamilabdullin/art</a>
					</strong>
				</p>
			</div>
		</div>
	</div>
  )
}
