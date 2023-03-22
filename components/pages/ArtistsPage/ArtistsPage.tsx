import { artistsApi } from '@/api/artists'
import { ArtistModel } from '@/types/Artists'
import React, { useEffect, useState } from 'react'
import styles from './ArtistsPage.module.sass'
import loading from '../../../public/loading1.json'
import Lottie from "lottie-react"
import Link from 'next/link'

export const ArtistsPage = () => {

	const [artists, setArtists] = useState <ArtistModel[]> ([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		artistsApi.getArtists('1')
			.then(artists => setArtists(artists.data))
			.then(res => setIsLoading(false))
	}, [])

  return (
	<div className={styles.artsts_page}>
		<div className={styles.container}>
			{isLoading ? 
				<div className={styles.loading_container}>
					<div className={styles.loading}>
						<Lottie animationData={loading} />
					</div>
				</div>	:
				<div className={styles.artists}>
					<div className={styles.artists_title}>
						<h1>Artists</h1>
					</div>
					<div className={styles.artists_list}>
						{artists.map((artist) => (
							<div key={artist.id}>
								<Link href={`/artists/${artist.id}`}>{artist.title}</Link>
							</div>
						))}
					</div>
				</div>
			}
		</div>
	</div>
  )
}
