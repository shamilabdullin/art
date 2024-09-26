import React, { useEffect, useState } from 'react'

//Components
import { SearchBar } from './SearchBar'
import { Navbar } from './Navbar'

// Stores, utils, libs
import { useQueryStore } from '../stateManagement/queryStore'
import { useRouter } from 'next/router'
import { useTagStore } from '@/stateManagement/tagStore'

// CSS
import styles from './styles/Header.module.sass'

export const Header: React.FC = () => {
  const [isLocalQuerySend, setIsLocalQuerySend] = useState(false)

  const query = useQueryStore((state) => state.query)
  const setQuery = useQueryStore((state) => state.setQuery)
  const isQuerySend = useQueryStore((state) => state.isSend)
  const setIsQuerySend = useQueryStore((state) => state.setIsSend)
  const setTag = useTagStore((state) => state.setTag)

  const router = useRouter()

  useEffect(() => {
    if (isLocalQuerySend) router.push('/')
  }, [isQuerySend])

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleQueryClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsQuerySend(!isQuerySend)
    setIsLocalQuerySend(true)
    setTag('')
  }

  return (
    <div className={styles.header}>
      <header className={styles.header_content}>
        <Navbar />
        <div className={styles.search_bar}>
          <SearchBar
            handleQueryChange={handleQueryChange}
            handleQueryClick={handleQueryClick}
            textFieldBackgroundColor="white"
            buttonBackgroundColor="#261f27"
            searchBarLength="230"
            addLink={true}
            placeholder="Keywords"
            formClass={styles.search_bar_form}
            inputClass={styles.search_bar_input}
            buttonClass={styles.search_bar_button}
          />
        </div>
      </header>
    </div>
  )
}
