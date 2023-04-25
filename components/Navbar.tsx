import React from 'react';

// Stores, utils, libs
import Link from 'next/link';
import Button from './artUI/Button';

// CSS
import styles from './styles/Navbar.module.sass';

export const Navbar = () => {
  return (
	<nav className={styles.navigation}>
		<Button bgcolor='black'>
			<Link href={'/'} className={styles.link} >Home</Link>
		</Button>
		<Button bgcolor='black'>
		<Link href={'/paintings'} className={styles.link} >Paintings</Link>
		</Button>
		<Button bgcolor='black'>
			<Link href={'/artists'} className={styles.link} >Artists</Link>
		</Button>
		<Button bgcolor='black'>
			<Link href={'/aboutUs'} className={styles.link} >About us</Link>
		</Button>
	</nav>
  )
}
