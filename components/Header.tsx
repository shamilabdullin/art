import React from 'react'

// Stores, utils, libs
import { Navbar } from './Navbar'
import Image from 'next/image'
import Link from 'next/link'

// CSS
import styles from './styles/Header.module.sass'

export const Header = () => {
  return (
	<header className={styles.header}>
		<Navbar />
		<div className={styles.logo}>
			<Link href='/'>
				<Image src='/mona-liza.svg' width={50} height={50} alt='Art' />
			</Link>
		</div>
	</header>
  )
}
