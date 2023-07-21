import React, { useEffect, useState } from 'react'

// Components
import { PageController } from '@/components/PageController'
import { SearchBar } from '@/components/SearchBar'
import { Loading } from '@/components/Loading'

// Stores, utils, libs
import { artistsApi } from '@/api/artists'
import Link from 'next/link'
import { useArtistStore, useArtistsStore } from '@/stateManagement/artistsStore'
import { useQueryStore } from '@/stateManagement/queryStore'
import { useRouter } from 'next/router'

// CSS
import styles from './ArtistsPage.module.sass'

export const ArtistsPage: React.FC = () => {

	const [isLoading, setIsLoading] = useState(false)
	const [pages, setPages] = useState('1')
	const [query, setQuery] = useState('')
	// const [queryArtists, setQueryArtists] = useState<ArtistQueryModel[]>([])
	const [isQuerySend, setIsQuerySend] = useState(false)
	const [currentPage, setCurrentPage] = useState('1')
	const addCurrentArtist = useArtistStore(state => state.addCurrentArtist)
	const artists = useArtistsStore(state => state.currentArtists)
	const setArtists = useArtistsStore(state => state.changeCurrentArtists)
	// const isHeaderQuerySend = useQueryStore(state => state.isSend)
	// const router = useRouter()
	// const currentPage = useArtistsStore(state => state.currentPage)
	// const setCurrentPage = useArtistsStore(state => state.setCurrentPage)

	useEffect(() => {
		setIsLoading(true)
		artistsApi.getArtistsQuery(query, currentPage)
			.then(res => {
				setArtists(res.data)
				if (res.pagination) {
					setPages(res.pagination.total_pages)
				}
			})
			.then(() => setIsLoading(false))
	}, [currentPage, isQuerySend])

	// useEffect(() => {
	// 	if (isHeaderQuerySend) router.push('/')
	// }, [isHeaderQuerySend])

	const artistHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		addCurrentArtist(e.currentTarget.text)
	}

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	const handleQueryClick = (e: React.SyntheticEvent) => {  // React.FormEvent<HTMLFormElement>
		e.preventDefault()
		setIsQuerySend(!isQuerySend)
	}

  	return (
  		<div>
			<div className={styles.artists_page}>
				<div className={styles.container}>
					<div className={styles.artists}>
						<div className={styles.artists_title}>
							<h1>Find your artist</h1>
						</div>
						{isLoading ?
							<Loading />
							:
							<>
								<div className={styles.artists_list}>
									{artists.map((artist) => (
										<div key={artist.id} className={styles.artist}>
											<Link href={`/artists/${artist.id}`} className={styles.artist_link} onClick={artistHandler}>{artist.title}</Link>  {/*onClick={(e) => addCurrentArtist(e.currentTarget.text)*/}
										</div>
									))}
								</div>
								<div className={styles.search_bar}>
									<SearchBar 
										handleQueryChange={handleQueryChange} 
										handleQueryClick={handleQueryClick}
										buttonBackgroundColor='black'
										searchBarLength='300'
										addLink={false}
										placeholder={"Artist's name"}
										inputClass={styles.search_bar_input}
										buttonClass={styles.search_bar_button}
									/>	
								</div>
								<div className={styles.page_controller}>
									<PageController page={currentPage} totalPages={pages} setPage={setCurrentPage}/>
								</div>
							</>	
						}
					</div>
				</div>
			</div>
		</div>
  	)
}

// useEffect(() => {
// 	if (queryArtists.length > 1) {
// 		setIsLoading(true)
// 		let ids = queryArtists.map(queryArtist => queryArtist.id)
// 		let request = ids.map(id => artistsApi.getArtist(id))
// 		Promise.all(request)
// 			.then(res => {
// 				const artists = res.map(responsiveData => responsiveData.data)
// 				setArtists(artists)
// 				setIsLoading(false)
// 			})
// 	}
// }, [queryArtists])