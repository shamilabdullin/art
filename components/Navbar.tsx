import React from 'react';

// Stores, utils, libs
import Link from 'next/link';
import Button from './artUI/Button';
import homeIcon from 'public/house-icon-light.svg'
import Image from 'next/image';
import brushIcon from 'public/brush-icon-light.svg'
import artistIcon from 'public/artist-icon-light.svg'
import questionIcon from 'public/question-icon-light.svg'
import classNames from 'classnames';
import logo from 'public/mona-liza.svg'

// CSS
import styles from './styles/Navbar.module.sass';

export const Navbar = () => {
  return (
	<nav className={styles.navigation}>
		<Button bgcolor='black'>
			<Link href={'/'} className={classNames(styles.link, styles.navigation_logo)}>
				<Image src={logo}  alt='homeIcon' width={42} height={42} className={styles.icon}/>
				<span>Art</span>
			</Link>
		</Button>
		<Button bgcolor='black'>
		<Link href={'/paintings'} className={styles.link} >
			<Image src={brushIcon} alt='brushIcon' height={20} className={styles.icon} />
			Paintings
		</Link>
		</Button>
		<Button bgcolor='black'>
			<Link href={'/artists'} className={styles.link} >
				<Image src={artistIcon} alt='artistIcon' height={20} className={styles.icon} />
				Artists
			</Link>
		</Button>
		<Button bgcolor='black'>
			<Link href={'/aboutUs'} className={styles.link} >
				<Image src={questionIcon} alt='questionIcon' height={20} className={styles.icon} />
				About us
			</Link>
		</Button>
	</nav>
  )
}
