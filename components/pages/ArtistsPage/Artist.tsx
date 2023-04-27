import React, { useEffect, useState } from 'react'

// Components
import { Collage } from '@/components/Collage'

// Stores, utils, libs
import { paintingsApi } from '@/api/paintings'
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings'
import loading from '../../../public/loading.json'
import Lottie from "lottie-react"

// CSS
import styles from './ArtistPage.module.sass'
import { useArtistStore } from '@/stateManagement/artistsStore'

const queryPainting: PaintingQueryModel = {
	api_link: '',
	api_model: '',
	id: '444',
	is_boosted: false,
	thumbnail: null,
	timestamp: '',
	title: '',
	_score: 0
}

const painting: PaintingModel = {
	id: 1,
	title: '',
	image_id: '90bc0cec-0d4e-9af5-3912-52a082a428e5',
	artist_title: '',
	category_titles: [''],
	classification_title: '',
	date_end: 0,
	date_start: 0,
	department_title: '',
	dimensions: '',
	exhibition_history: '',
	place_of_origin: '',
	provenance_text: '',
	publication_history: '',
	medium_display: ''
}

const Artist = () => {

	const [artistPaintings, setArtistPaintings] = useState<PaintingQueryModel[]>([])  // queryPainting
	const [isLoading, setIsLoading] = useState(false)
	const [paintings, setPaintings] = useState<any[] | PaintingModel[]>([])  // painting
	const currentArtist = useArtistStore(state => state.currentArtist)

	useEffect(() => {
		setIsLoading(true)
		const currentUrl = window.location.href.split('/')[4]
		paintingsApi.getArtistsPaintings('', currentUrl)  //'Monet', '35809'
			.then(res => {
				setArtistPaintings(res.data)
			})
			// .then(() => setIsLoading(false))
	}, [])

	useEffect(() => {
		let paintingsBuffer: PaintingModel[] | any[] = []
		for (let i = 0; i < artistPaintings.length; i++) {
			const id = artistPaintings[i].id
			paintingsApi.getPainting(id)
				.then(painting => {
					paintingsBuffer.push(painting.data)
				})
				.then(() => {
					if (i === artistPaintings.length - 1) {
						setPaintings(paintingsBuffer)
						setIsLoading(false)
					}
				})
		}
	}, [artistPaintings])

  return (
	<div>
		{isLoading ? 
			<div className={styles.loadingContainer}>
				<div className={styles.loading}>
					<Lottie animationData={loading}></Lottie>
				</div>
			</div>	:
			<div className={styles.artist_page}>
				<div className={styles.container}>
					<div className={styles.artist_name}>
						{/* <h2>{paintings[0] ? paintings[0].artist_title : 'Artist title'}</h2> */}
						<h2>{currentArtist === '' ? "Artist's title" : currentArtist}</h2>
					</div>
					<Collage paintings={paintings}/>
				</div>
			</div>
		}
	</div>
  )
}

export default Artist