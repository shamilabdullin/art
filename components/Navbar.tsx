import React from 'react'

// Components
import Link from 'next/link'
import Button from './artUI/Button'
import Image from 'next/image'

// Stores, utils, libs
import brushIcon from 'public/brush-icon-light.svg'
import artistIcon from 'public/artist-icon-light.svg'
import questionIcon from 'public/question-icon-light.svg'
import classNames from 'classnames'
import logo from 'public/mona-liza.svg'
import { useQueryStore } from '@/stateManagement/queryStore'

// CSS
import styles from './styles/Navbar.module.sass'

export const Navbar = () => {
  const setQuery = useQueryStore((state) => state.setQuery)

  const buttonColor = '#261f27'

  return (
    <nav className={styles.navigation} onClick={() => setQuery('')}>
      <Button bgcolor={buttonColor}>
        <Link href={'/'} className={classNames(styles.link, styles.navigation_logo)}>
          <Image src={logo} alt="homeIcon" className={styles.logo_icon} />
          <span>Art</span>
        </Link>
      </Button>
      <Button bgcolor={buttonColor} onClick={() => setQuery('')}>
        <Link href={'/paintings'} className={styles.link}>
          <Image src={brushIcon} alt="brushIcon" className={styles.icon} />
          Paintings
        </Link>
      </Button>
      <Button bgcolor={buttonColor} onClick={() => setQuery('')}>
        <Link href={'/artists'} className={styles.link}>
          <Image src={artistIcon} alt="artistIcon" className={styles.icon} />
          Artists
        </Link>
      </Button>
      <Button bgcolor={buttonColor} onClick={() => setQuery('')}>
        <Link href={'/aboutUs'} className={styles.link}>
          <Image src={questionIcon} alt="questionIcon" className={styles.icon} />
          About me
        </Link>
      </Button>
    </nav>
  )
}
