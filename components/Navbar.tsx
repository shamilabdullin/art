import React from 'react';
import Link from 'next/link';
import styles from './styles/Navbar.module.sass';
import Button from './artUI/Button';

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
			<Link href={'/aboutUs'} className={styles.link} >About us</Link>
		</Button>
	</nav>
  )
}
