import React, { MouseEventHandler, useEffect, useState } from 'react'

// Components
import { PageController } from '@/components/PageController'
import { SearchBar } from '@/components/SearchBar'
import { Loading } from '@/components/Loading'

// Stores, utils, libs
import { artistsApi } from '@/api/artists'
import { ArtistModel, ArtistQueryModel } from '@/types/Artists'
import loading from '../../../public/loading1.json'
import Lottie from "lottie-react"
import Link from 'next/link'
import { useArtistStore, useArtistsStore } from '@/stateManagement/artistsStore'


// CSS
import styles from './ArtistsPage.module.sass'

export const ArtistsPage = () => {

	// const [artists, setArtists] = useState <ArtistModel[]> ([])
	const [isLoading, setIsLoading] = useState(false)
	const [pages, setPages] = useState('1')
	//const [currentPage, setCurrentPage] = useState('1')
	const addCurrentArtist = useArtistStore(state => state.addCurrentArtist)
	const [query, setQuery] = useState('')
	const [queryArtists, setQueryArtists] = useState<ArtistQueryModel[]>([])
	const artists = useArtistsStore(state => state.currentArtists)
	const setArtists = useArtistsStore(state => state.changeCurrentArtists)
	const currentPage = useArtistsStore(state => state.currentPage)
	const setCurrentPage = useArtistsStore(state => state.setCurrentPage)

	useEffect(() => {
		setIsLoading(true)
		artistsApi.getArtists(currentPage)
			.then(artists => {
				setArtists(artists.data)
				if (artists.pagination) {
					setPages(artists.pagination.total_pages)
				}
			})
			.then(() => setIsLoading(false))
	}, [currentPage])

	useEffect(() => {
		if (queryArtists.length > 1) {
			setIsLoading(true)
			let ids = queryArtists.map(queryArtist => queryArtist.id)
			let request = ids.map(id => artistsApi.getArtist(id))
			Promise.all(request)
				.then(res => {
					const artists = res.map(responsiveData => responsiveData.data)
					setArtists(artists)
					setIsLoading(false)
				})
		}
	}, [queryArtists])

	const artistHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		addCurrentArtist(e.currentTarget.text)
	}

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	const handleQueryClick = () => {
		setIsLoading(true)
		artistsApi.getArtistsQuery(query)
			.then(res => {
				setQueryArtists(res.data)
			})
	}

  	return (
  		<>
			{isLoading ? 
				<Loading />	:
				<div className={styles.artsts_page}>
					<div className={styles.container}>
						<div className={styles.artists}>
							<div className={styles.artists_title}>
								<h1>Artists</h1>
							</div>
							<div className={styles.artists_list}>
								{artists.map((artist) => (
									<div key={artist.id}>
										<Link href={`/artists/${artist.id}`} className={styles.artist} onClick={artistHandler}>{artist.title}</Link>  {/*onClick={(e) => addCurrentArtist(e.currentTarget.text)*/}
									</div>
								))}
							</div>
							<div className={styles.search_bar}>
								<SearchBar handleQueryChange={handleQueryChange} handleQueryClick={handleQueryClick}/>	
							</div>
							<div className={styles.page_controller}>
								<PageController page={currentPage} totalPages={pages} setPage={setCurrentPage}/>
							</div>
						</div>
					</div>
				</div>
			}
		</>
  	)
}
