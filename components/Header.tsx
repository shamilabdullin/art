import React, { useEffect, useState } from 'react'

//Components
import { SearchBar } from './SearchBar'

// Stores, utils, libs
import { Navbar } from './Navbar'
import Image from 'next/image'
import Link from 'next/link'
import Button from './artUI/Button'
import questionIcon from 'public/question-icon-light.svg'
import { useQueryStore } from '../stateManagement/queryStore'
import { useRouter } from 'next/router'

// CSS
import styles from './styles/Header.module.sass'

export const Header: React.FC = () => {

	const [isLocalQuerySend, setIsLocalQuerySend] = useState(false)
	const query = useQueryStore(state => state.query)
	const setQuery = useQueryStore(state => state.setQuery)
	const isQuerySend = useQueryStore(state => state.isSend)
	const setIsQuerySend = useQueryStore(state => state.setIsSend)
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
	}

	return (
		<div className={styles.header}>
			<header className={styles.header_content}>
				<Navbar />
				<div className={styles.search_bar}>
					<SearchBar 
						handleQueryChange={handleQueryChange} 
						handleQueryClick={handleQueryClick} 
						textFieldBackgroundColor='white'
						buttonBackgroundColor='black'
						searchBarLength='230'
						addLink={true}
						placeholder='keyword'
					/>
				</div>
			</header>
		</div>
	)
}
