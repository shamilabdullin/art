import React from 'react'
import styles from './styles/Header.module.sass'
import { Navbar } from './Navbar'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
	<header className={styles.header}>
		<Navbar />
		<div className={styles.logo}>
			<Link href='/'>
				<Image src='/art-light.png' width={50} height={50} alt='Art' />
			</Link>
		</div>
	</header>
  )
}
