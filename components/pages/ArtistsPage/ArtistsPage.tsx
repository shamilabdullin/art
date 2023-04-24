import { artistsApi } from '@/api/artists'
import { ArtistModel } from '@/types/Artists'
import React, { useEffect, useState } from 'react'
import styles from './ArtistsPage.module.sass'
import loading from '../../../public/loading1.json'
import Lottie from "lottie-react"
import Link from 'next/link'
import { PageController } from '@/components/PageController'

export const ArtistsPage = () => {

	const [artists, setArtists] = useState <ArtistModel[]> ([])
	const [isLoading, setIsLoading] = useState(false)
	const [pages, setPages] = useState('1')
	const [page, setPage] = useState('1')

	useEffect(() => {
		setIsLoading(true)
		artistsApi.getArtists(page)
			.then(artists => {
				setArtists(artists.data)
				if (artists.pagination) {
					setPages(artists.pagination.total_pages)
				}
			})
			.then(res => setIsLoading(false))
	}, [page])

  	return (
  		<>
			{isLoading ? 
				<div className={styles.loading_container}>
					<div className={styles.loading}>
						<Lottie animationData={loading} />
					</div>
				</div>	:
				<div className={styles.artsts_page}>
					<div className={styles.container}>
						<div className={styles.artists}>
							<div className={styles.artists_title}>
								<h1>Artists</h1>
							</div>
							<div className={styles.artists_list}>
								{artists.map((artist) => (
									<div key={artist.id}>
										<Link href={`/artists/${artist.id}`} className={styles.artist}>{artist.title}</Link>
									</div>
								))}
							</div>
							<div className={styles.page_controller}>
								<PageController page={page} totalPages={pages} setPage={setPage}/>
							</div>
						</div>
					</div>
				</div>
			}
		</>
  	)
}
